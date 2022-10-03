import { validate as isValidUUID } from 'uuid';

import { UpdateStudentDto } from '@contests/dto';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

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
        update: {
          ...rest,
          teacher: teacherId
            ? {
                connect: {
                  id: teacherId,
                },
              }
            : {
                disconnect: true,
              },
        },
      },
    };
    try {
      if (teacherId && !isValidUUID(teacherId)) {
        delete user.profile.update.teacher;
      }
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
        // TODO Send Notification to New Teacher
        console.log('Send Notification to New Teacherzzz');
      }
      return updated;
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
