import Redis from 'ioredis';
import { Prisma } from '@prisma/auth-service';
import { validate as isValidUUID } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { UpdateDocumentsDto, UpdateStudentDto } from '@contests/dto/auth';
import { RoleTitle, STUDENT_ADD_TEACHER_EVENT } from '@contests/types/auth';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis('publisher') private readonly client: Redis
  ) {}

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
        this.client.publish(
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

  /**
   * Search students by name.
   *
   * @param name string
   * @returns
   */
  async searchStudents(name?: string, teacherId?: string) {
    try {
      const where: Prisma.UserWhereInput = {
        AND: {
          role: {
            title: {
              in: [RoleTitle.STUDENT, RoleTitle.STUDENT_TEACHER],
            },
          },
          profile: name
            ? {
                OR: [
                  { firstName: { contains: name } },
                  { lastName: { contains: name } },
                ],
                teacherId: teacherId ?? null,
              }
            : {
                teacherId: teacherId ?? null,
              },
        },
      };
      if (!teacherId) {
        where.AND = {
          ...where.AND,
          isActive: true,
        };
      }

      return this.prisma.user.findMany({
        take: name ? 100 : 50,
        where,
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
