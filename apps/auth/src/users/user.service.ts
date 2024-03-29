import {
  Logger,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/auth-service';
import { UpdateUserDto } from '@contests/dto/auth';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../app/prisma.service';
import { PasswordService } from '../authentication/password.service';
import { RoleTitle, USER_ROLE_UPDATED_EVENT } from '@contests/types/auth';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private eventEmitter: EventEmitter2
  ) {}

  /**
   * Get data for Admin Dashboard.
   *
   * @returns Promise<{
                        teachers: number;
                        students: number;
                        levels: (Prisma.PickArray<Prisma.ProfileGroupByOutputType, "level"[]> & {})[];
                      }>
   */
  async dashboard() {
    try {
      const teachers = await this.prisma.user.count({
        where: {
          role: {
            title: { in: [RoleTitle.GOLDEN_TEACHER, RoleTitle.TEACHER] },
          },
        },
      });
      const students = await this.prisma.user.count({
        where: {
          role: {
            title: RoleTitle.STUDENT,
          },
        },
      });
      const studentTeacher = await this.prisma.user.count({
        where: {
          role: {
            title: RoleTitle.STUDENT_TEACHER,
          },
        },
      });
      const levels = await this.prisma.profile.groupBy({
        by: ['level'],
        _count: {
          level: true,
        },
      });
      return {
        teachers,
        students,
        studentTeacher,
        levels: levels.map((el) => ({
          level: el.level,
          value: el._count.level,
        })),
      };
    } catch (error) {
      Logger.error(error);
    }
  }

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
   * Find Admin and Teacher for chatting contact list.
   *
   * @param input Prisma.UserWhereUniqueInput The unique id of the User.
   * @returns Promise<User[]>
   */
  async findAdminAndTeacher(input?: Prisma.UserWhereUniqueInput) {
    const result = [];
    try {
      const admin = await this.prisma.user.findFirst({
        where: {
          role: {
            title: {
              in: [RoleTitle.ADMIN],
            },
          },
        },
        include: {
          role: true,
          profile: true,
        },
      });
      result.push(admin);
      if (input?.id) {
        const teacher = await this.prisma.user.findFirstOrThrow({
          where: {
            profile: {
              id: input.id,
            },
          },
          include: {
            role: true,
            profile: true,
          },
        });
        result.push(teacher);
      }
      return result;
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Update messages views count.
   *
   * @param id string
   * @param count number
   * @param isMessage boolean
   *
   * @returns Promise<User>
   */
  async updateMessagesCount(id: string, count: number, isMessage: boolean) {
    try {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: isMessage
          ? {
              messagesCount: { increment: count },
            }
          : {
              notificationsCount: { increment: count },
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
      planId: result.profile.subscription?.memberShipOn[0].id,
      membershipPeriod: result.profile.subscription?.memberShipOn[0].period,
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
