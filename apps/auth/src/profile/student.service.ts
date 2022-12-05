import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { RoleTitle } from '@contests/types/auth';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { Prisma } from '@prisma/auth-service';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis
  ) {}

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
