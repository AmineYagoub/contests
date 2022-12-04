import { validate as isValidUUID } from 'uuid';

import {
  UpdateDocumentsDto,
  UpdateStudentDto,
  UpdateTeacherDto,
  UpdateTeacherSubscriptionDto,
} from '@contests/dto/auth';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';
import {
  MembershipStatus,
  RoleTitle,
  STUDENT_ADD_TEACHER_EVENT,
  TeacherRoleMutationEvent,
  TEACHER_CONNECT_STUDENT_EVENT,
  USER_ROLE_UPDATED_EVENT,
} from '@contests/types/auth';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis
  ) {}

  /**
   * Find a Profile by its unique key.
   *
   * @param input Prisma.ProfileWhereUniqueInput The unique key of the Profile.
   * @returns Promise<Profile | null>
   */
  async findUnique(input: Prisma.ProfileWhereUniqueInput) {
    try {
      return this.prisma.profile.findUniqueOrThrow({
        where: input,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Update the profile of student
   *
   * @param params Prisma.UserUpdateInput The User data.
   * @returns Promise<User>
   */
  async updateStudentProfile(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateStudentDto;
  }) {
    const {
      data: { role, teacherId, ...rest },
      where,
    } = params;
    const user: Prisma.UserUpdateWithoutEmailTokenInput = {
      role: {
        connectOrCreate: {
          create: {
            title: role,
          },
          where: {
            title: role,
          },
        },
      },
      profile: {
        update: rest,
      },
    };
    try {
      const updated = await this.prisma.user.update({
        where,
        data: user,
        include: {
          profile: {
            include: { teacher: true },
          },
          role: true,
        },
      });
      if (isValidUUID(teacherId)) {
        this.redis.publish(
          STUDENT_ADD_TEACHER_EVENT,
          JSON.stringify({
            teacherId,
            userId: updated.id,
            name: `${updated.profile.firstName} ${updated.profile.lastName}`,
          })
        );
      }
      return updated;
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Update the profile of student to connect it to chosen teacher
   *
   * @param params Prisma.UserUpdateInput The User data.
   * @returns Promise<User>
   */
  async connectStudentToTeacher(params: {
    where: Prisma.UserWhereUniqueInput;
    studentId: string;
    connect: boolean;
  }) {
    const { studentId, where, connect } = params;
    const user: Prisma.ProfileUpdateWithoutTeacherInput = {
      students: connect
        ? {
            connect: {
              userId: studentId,
            },
          }
        : {
            disconnect: {
              userId: studentId,
            },
          },
    };
    try {
      const updated = await this.prisma.profile.update({
        where,
        data: user,
      });
      this.redis.publish(
        TEACHER_CONNECT_STUDENT_EVENT,
        JSON.stringify({
          connect,
          studentId,
          teacherId: updated.userId,
          name: `${updated.firstName} ${updated.lastName}`,
        })
      );
      // Change student role
      if (!connect) {
        await this.prisma.user.update({
          where: { id: studentId },
          data: { role: { connect: { title: RoleTitle.STUDENT } } },
        });
      }
      return updated;
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Update the profile of Teacher
   *
   * @param params Prisma.UserUpdateInput The User data.
   * @returns Promise<User>
   */
  async updateTeacherProfile(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateTeacherDto;
  }) {
    const {
      data: { phone, phoneCode, ...rest },
      where,
    } = params;
    const user: Prisma.UserUpdateWithoutEmailTokenInput = {
      profile: {
        upsert: {
          create: {
            ...rest,
            phone: { phone, phoneCode },
          },
          update: {
            ...rest,
            phone: { phone, phoneCode },
          },
        },
      },
    };
    try {
      return await this.prisma.user.update({
        where,
        data: user,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Create or update teacher subscription.
   *
   * @param params
   * @returns Promise<Profile>
   */
  async updateTeacherSubscription(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: UpdateTeacherSubscriptionDto;
  }) {
    return this.updateSubscription(params);
  }

  /**
   * Update Teacher subscription when Admin change his role.
   *
   * @param payload: TeacherRoleMutationEvent
   *
   * @returns  Promise<Profile>
   */
  @OnEvent(USER_ROLE_UPDATED_EVENT)
  async onAdminUpdateUserRole(payload: TeacherRoleMutationEvent) {
    if ([RoleTitle.GOLDEN_TEACHER, RoleTitle.TEACHER].includes(payload.role)) {
      const isGold = RoleTitle.GOLDEN_TEACHER === payload.role;
      const { planId, profileId, membershipPeriod } = payload;
      const where: Prisma.ProfileWhereUniqueInput = { id: profileId };
      const data = {
        planId,
        membershipStatus: isGold
          ? MembershipStatus.ACTIVE
          : MembershipStatus.CANCELED,
        startDate: isGold ? new Date() : null,
        endDate: isGold
          ? new Date(Date.now() + membershipPeriod * 24 * 60 * 60 * 1000)
          : null,
      };
      return this.updateSubscription({ where, data });
    }
  }

  /**
   *
   * @param params
   * @returns
   */
  private async updateSubscription(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: UpdateTeacherSubscriptionDto;
  }) {
    const { planId, membershipStatus, disconnect, ...rest } = params.data;
    const { where } = params;

    const user: Prisma.ProfileUpdateInput = {
      subscription: disconnect
        ? {
            delete: true,
          }
        : {
            upsert: {
              create: {
                ...rest,
                status: membershipStatus,
                memberShipOn: {
                  connect: {
                    id: planId,
                  },
                },
              },
              update: {
                ...rest,
                status: membershipStatus,
                memberShipOn: {
                  connect: {
                    id: planId,
                  },
                },
              },
            },
          },
    };

    try {
      return await this.prisma.profile.update({
        where,
        data: user,
        include: {
          subscription: {
            include: {
              memberShipOn: true,
            },
          },
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Update the Documents of student.
   *
   * @param params Prisma.UserUpdateInput The User data.
   * @returns Promise<User>
   */
  async updateStudentDocuments(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateDocumentsDto;
  }) {
    const { data, where } = params;
    try {
      return await this.prisma.user.update({
        where,
        data: {
          profile: {
            update: data,
          },
        },
        include: {
          profile: {
            include: { teacher: true },
          },
          role: true,
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
