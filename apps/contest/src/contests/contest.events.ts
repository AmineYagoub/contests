import { ContestCreatedEvent, CONTEST_CREATED_WILDCARD } from '@contests/types';
import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ContestEvents {
  constructor(private prisma: PrismaService) {}

  /**
   * Update contest to add participants ids.
   *
   * @param payload: ContestCreatedEvent
   *
   * @returns Promise<Message>
   */
  @OnEvent(CONTEST_CREATED_WILDCARD)
  async onContestCreatedEvent(payload: ContestCreatedEvent) {
    try {
      if (payload.participants?.length) {
        await this.prisma.contest.update({
          data: {
            participants: payload.participants,
          },
          where: { id: payload.contestId },
        });
      }
    } catch (error) {
      Logger.log(error);
    }
  }
}
