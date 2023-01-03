import {
  RoleTitle,
  MembershipStatus,
  TeacherRoleMutationEvent,
  TEACHER_CONNECT_STUDENT_EVENT,
  USER_ROLE_UPDATED_EVENT,
} from '@contests/types/auth';
import Redis from 'ioredis';
import { OnEvent } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/auth-service';
import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { UpdateTeacherSubscriptionDto } from '@contests/dto/auth';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis('publisher') private readonly client: Redis
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
    const profile: Prisma.ProfileUpdateOneWithoutUserNestedInput = {
      update: {
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
      },
    };
    try {
      const updated = await this.prisma.user.update({
        where,
        data: {
          profile,
        },
        include: { profile: true },
      });
      this.client.publish(
        TEACHER_CONNECT_STUDENT_EVENT,
        JSON.stringify({
          connect,
          studentId,
          teacherId: updated.profile.userId,
          name: `${updated.profile.firstName} ${updated.profile.lastName}`,
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
}
