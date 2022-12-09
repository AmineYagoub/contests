import { UpdateUserDto } from '@contests/dto/auth';
import { RoleTitle, USER_ROLE_UPDATED_EVENT } from '@contests/types/auth';
import {
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';
import { PasswordService } from '../authentication/password.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private eventEmitter: EventEmitter2
  ) {}

  /**
   * Find a User by its unique key.
   *
   * @param input Prisma.UserWhereUniqueInput The unique key of the User.
   * @returns Promise<User | null>
   */
  async findUnique(input: Prisma.UserWhereUniqueInput) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: input,
        include: {
          role: { include: { permissions: true } },
          profile: {
            include: {
              teacher: true,
              subscription: { include: { memberShipOn: true } },
            },
          },
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Update a User
   *
   * @param params Prisma.UserUpdateInput The User data.
   * @returns Promise<User>
   */
  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }) {
    const { data, where } = params;
    const { currentPassword, role, ...payload } = data;
    if (data.password) {
      const user = await this.prisma.user.findUniqueOrThrow({
        where,
      });
      if (!user.isActive) {
        throw new UnauthorizedException('User Banned');
      }
      const passwordValid = await this.passwordService.validatePassword(
        String(currentPassword),
        user.password
      );

      if (!passwordValid) {
        throw new UnprocessableEntityException('Invalid Password');
      }

      payload.password = await this.passwordService.hashPassword(
        String(data.password)
      );
    }
    if (data.role) {
      (payload as Prisma.UserUpdateInput).role = {
        connectOrCreate: {
          create: {
            title: role,
          },
          where: {
            title: role,
          },
        },
      };
    }
    const result = await this.prisma.user.update({
      data: payload,
      where,
      include: {
        profile: {
          include: { subscription: { include: { memberShipOn: true } } },
        },
      },
    });

    // TODO Notify also teacher if student choose it as instructor
    this.eventEmitter.emit(USER_ROLE_UPDATED_EVENT, {
      role,
      profileId: result.profile.id,
      membershipId: result.profile.subscription?.id,
      planId: result.profile.subscription?.memberShipOn.id,
      membershipPeriod: result.profile.subscription?.memberShipOn.period,
    });
    return result;
  }

  /**
   * Paginate users
   *
   * @param params Prisma.UserPaginationInput The pagination input.
   * @returns Promise<Prisma.User[]>
   */
  async searchFirstLastName(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.ProfileWhereInput & Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, where } = params;
    const { firstName } = where;

    const searchArray = String(firstName)
      .toLowerCase()
      .split(/\s+/g)
      .map((s: string) => `%${s}%`);
    const users = await this.prisma.$queryRaw`
          SELECT *
          FROM Profile
          WHERE lower(concat(firstName, lastName))
          LIKE ${Prisma.join(
            searchArray,
            ' AND lower(concat(firstName, lastName)) LIKE '
          )}
          LIMIT ${skip}, ${take}
        `;

    return users;
  }

  /**
   * Paginate users
   *
   * @param params Prisma.UserPaginationInput The pagination input.
   * @returns Promise<Prisma.User[]>
   */
  async paginate(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.ProfileWhereInput & Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where: w, orderBy } = params;
    const where = this.buildWhere(w);
    const sort = this.buildSorter(orderBy);
    const data = await this.prisma.$transaction([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy: sort,
        include: {
          profile: true,
          role: true,
        },
      }),
    ]);
    return {
      total: data[0],
      data: data[1],
    };
  }

  /**
   * Build the orderBy input for the paginate query.
   *
   * @param orderBy Prisma.UserOrderByWithRelationInput The User orderBy input.
   * @returns Prisma.UserOrderByWithRelationInput The built orderBy input.
   */
  private buildSorter(orderBy: Prisma.UserOrderByWithRelationInput) {
    return orderBy
      ? Object.entries(orderBy).map(([key, value]) => ({ [key]: value }))
      : { created: Prisma.SortOrder.desc };
  }

  /**
   * Build the where input for the paginate query.
   *
   * @param where Prisma.UserWhereInput The User where input.
   *
   * @returns Prisma.UserWhereInput The built where input.
   */
  private buildWhere(
    where?: Prisma.ProfileWhereInput & Prisma.UserWhereInput
  ): Prisma.UserWhereInput {
    let filter: Prisma.ProfileWhereInput & Prisma.UserWhereInput = {};
    if (where) {
      for (const [key, value] of Object.entries(where)) {
        if (key === 'teacherId') {
          filter.profile = {
            teacherId: String(value),
          };
        }
        if (['firstName', 'lastName', 'country', 'level'].includes(key)) {
          filter.profile = {
            ...filter.profile,
            [key]: {
              contains: String(value),
            },
          };
        }

        if (['emailConfirmed', 'isActive'].includes(key)) {
          filter = {
            ...filter,
            [key]: value,
          };
        }
        if (key === 'role') {
          filter.role = {
            title: {
              in: value as RoleTitle[],
            },
          };
        }
        if (key === 'created') {
          filter.created = {
            lte: new Date(value[1]),
            gte: new Date(value[0]),
          };
        }
      }
    }
    return filter;
  }

  /**
   * Delete a User
   *
   * @param where Prisma.UserWhereInput The User where input.
   * @returns  Promise<User>
   */
  async delete(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}
