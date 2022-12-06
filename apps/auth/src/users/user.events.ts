import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  ContestCreatedEvent,
  CONTEST_CREATED_EVENT,
  CONTEST_CREATED_FOR_EVENT,
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
   * Send participants IDS to message service.
   *
   * @param payload: ContestCreatedEvent
   *
   * @returns Promise<void>
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
      payload.participants = users.map((el) => el.id);
      this.publisher.publish(
        CONTEST_CREATED_FOR_EVENT,
        JSON.stringify(payload)
      );
    }
  }
}
