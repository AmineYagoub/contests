import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from '../app/prisma.service';
import { RoleTitle } from '@contests/types/auth';

export const UPDATE_MEMBERSHIP = 'UPDATE_MEMBERSHIP';

@Processor(UPDATE_MEMBERSHIP)
export class MembershipConsumer {
  constructor(private prisma: PrismaService) {}

  private dateExpired(firstDate: Date, secondDate: Date) {
    return firstDate.setHours(0, 0, 0, 0) >= secondDate.setHours(0, 0, 0, 0);
  }

  /**
   * Update teacher membership and change its role to RoleTitle.TEACHER
   *
   * @param job
   * @returns Promise<{}>
   */
  @Process()
  async updateTeacherMembership() {
    try {
      const res = await this.prisma.membership.findMany();
      const today = new Date();
      for (const iterator of res) {
        if (this.dateExpired(today, new Date(iterator.endDate))) {
          await this.prisma.profile.update({
            data: {
              user: {
                update: {
                  role: {
                    connect: {
                      title: RoleTitle.TEACHER,
                    },
                  },
                },
              },
            },
            where: { id: iterator.profileId },
          });
          await this.prisma.membership.delete({
            where: {
              id: iterator.id,
            },
          });
        }
      }
      return {};
    } catch (error) {
      console.log(error);
    }
  }
}
