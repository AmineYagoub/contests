import { UpdateUserDto } from '@contests/dto';
import { RoleTitle } from '@contests/types';
import {
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';
import { PasswordService } from '../authentication/password.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly passwordService: PasswordService
  ) {}

  /**
   * Find a User by its unique key.
   *
   * @param input Prisma.UserWhereUniqueInput The unique key of the User.
   * @returns Promise<User | null>
   */
  async findUnique(input: Prisma.UserWhereUniqueInput) {
    try {
      return this.prisma.user.findUniqueOrThrow({
        where: input,
        include: {
          role: true,
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Search teachers by name.
   *
   * @param name string
   * @returns
   */
  async findTeacher(name?: string): Promise<User[]> {
    try {
      return this.prisma.user.findMany({
        take: name ? 100 : 15,
        where: {
          AND: {
            isActive: true,
            role: {
              title: {
                in: [RoleTitle.GOLDEN_TEACHER, RoleTitle.TEACHER],
              },
            },
            profile: name
              ? {
                  OR: [
                    { firstName: { contains: name } },
                    { lastName: { contains: name } },
                  ],
                }
              : {},
          },
        },
        include: {
          role: true,
          profile: true,
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
    if (data.password) {
      const user = await this.prisma.user.findUniqueOrThrow({
        where,
      });
      if (!user.isActive) {
        throw new UnauthorizedException('User Banned');
      }
      const passwordValid = await this.passwordService.validatePassword(
        String(data.currentPassword),
        user.password
      );

      if (!passwordValid) {
        throw new UnprocessableEntityException('Invalid Password');
      }
      delete data.currentPassword;
      data.password = await this.passwordService.hashPassword(
        String(data.password)
      );
    }
    return this.prisma.user.update({
      data,
      where,
    });
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
    const filter: Prisma.ProfileWhereInput & Prisma.UserWhereInput = {};
    if (where) {
      for (const [key, value] of Object.entries(where)) {
        switch (key) {
          case 'firstName':
          case 'lastName':
          case 'country':
          case 'level':
            filter[key] = {
              contains: String(value),
            };
            break;
          case 'emailConfirmed':
            filter.emailConfirmed = Boolean(value);
            break;

          case 'role':
            filter.role = {
              title: {
                contains: String(value),
              },
            };
            break;

          case 'created':
            filter.created = {
              lte: new Date(value[1]),
              gte: new Date(value[0]),
            };
            break;
          default:
            break;
        }
      }
    }
    return filter;
  }
}
