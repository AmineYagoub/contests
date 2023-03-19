import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { RoleTitle } from '@contests/types/auth';
import { UpdateTeacherDto } from '@contests/dto/auth';
import { Prisma } from '@prisma/auth-service';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

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
   * Search teachers by name.
   *
   * @param name string
   * @returns
   */
  async searchTeachers(name?: string) {
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
}
