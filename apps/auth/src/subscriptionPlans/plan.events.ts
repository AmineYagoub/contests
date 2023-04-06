import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

import { ContestCreatedEvent, CONTEST_CREATED_EVENT } from '@contests/types';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class PlanEvents {
  constructor(private prisma: PrismaService) {}

  /**
   * Increment contestCount field for teacher membership.
   *
   * @param payload: ContestCreatedEvent
   *
   * @returns Promise<void>
   */
  @OnEvent(CONTEST_CREATED_EVENT)
  async onContestCreatedEvent(payload: ContestCreatedEvent) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: payload.authorId },
        include: { profile: true },
      });
      await this.prisma.membership.update({
        where: { profileId: user.profile.id },
        data: { contestCount: { increment: 1 } },
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
