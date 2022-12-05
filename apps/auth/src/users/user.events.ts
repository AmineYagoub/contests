import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  ContestCreatedEvent,
  CONTEST_CREATED_EVENT,
  CONTEST_PARTICIPATING_IDS_EVENT,
} from '@contests/types';

@Injectable()
export class UserEvents {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    @InjectRedis() private readonly client: Redis,
    @InjectRedis('publisher') private readonly publisher: Redis
  ) {
    this.client.subscribe(CONTEST_CREATED_EVENT, (err, count) => {
      if (err) {
        Logger.error('Failed to subscribe: %s', err.message);
      } else {
        Logger.log(
          `Subscribed successfully! to ${count} channels.`,
          'RedisModule'
        );
      }
    });
    this.client.on('message', (channel: string, message: string) => {
      this.eventEmitter.emit(channel, JSON.parse(message));
    });
  }

  /**
   * Send Notification to teacher.
   *
   * @param payload: StudentUpdateTeacher
   *
   * @returns Promise<Message>
   */
  @OnEvent(CONTEST_CREATED_EVENT)
  async onContestCreatedEvent(payload: ContestCreatedEvent) {
    if (payload.level) {
      const users = await this.prisma.user.findMany({
        where: {
          isActive: true,
          profile: {
            level: {
              in: payload.level,
            },
          },
        },
        select: { id: true },
      });
      this.publisher.publish(
        CONTEST_PARTICIPATING_IDS_EVENT,
        JSON.stringify(users)
      );
    }
  }
}
