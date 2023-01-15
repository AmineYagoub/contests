import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  ContestCreatedEvent,
  CONTEST_CREATED_EVENT,
  CONTEST_CREATED_FOR_EVENT,
  MessageRecipients,
  MessagesSendEvent,
  MESSAGES_SEND_EVENT,
} from '@contests/types';
import { MESSAGES_SEND_FOR_EVENT, RoleTitle } from '@contests/types/auth';

@Injectable()
export class UserEvents {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    @InjectRedis() private readonly client: Redis,
    @InjectRedis('publisher') private readonly publisher: Redis
  ) {
    this.client.subscribe(
      CONTEST_CREATED_EVENT,
      MESSAGES_SEND_EVENT,
      (err, count) => {
        if (err) {
          Logger.error('Failed to subscribe: %s', err.message);
        } else {
          Logger.log(
            `Subscribed successfully! to ${count} channels.`,
            'RedisModule'
          );
        }
      }
    );
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

  /**
   * Send recipients IDS to message service.
   *
   * @param payload: MessagesSendEvent
   *
   * @returns Promise<void>
   */
  @OnEvent(MESSAGES_SEND_EVENT)
  async onNotificationSentEvent(payload: MessagesSendEvent) {
    const roles: RoleTitle[] = [];
    payload.recipients.forEach((e) => {
      switch (Number(e)) {
        case MessageRecipients.FREE_STUDENTS:
          roles.push(RoleTitle.STUDENT);
          break;
        case MessageRecipients.STUDENTS_TEACHERS:
          roles.push(RoleTitle.STUDENT_TEACHER);
          break;
        case MessageRecipients.STUDENTS:
          roles.push(RoleTitle.STUDENT, RoleTitle.STUDENT_TEACHER);
          break;
        case MessageRecipients.FREE_TEACHERS:
          roles.push(RoleTitle.TEACHER);
          break;
        case MessageRecipients.GOLDEN_TEACHERS:
          roles.push(RoleTitle.GOLDEN_TEACHER);
          break;
        case MessageRecipients.TEACHERS:
          roles.push(RoleTitle.TEACHER, RoleTitle.GOLDEN_TEACHER);
          break;
        case MessageRecipients.ALL:
          roles.push(
            RoleTitle.TEACHER,
            RoleTitle.GOLDEN_TEACHER,
            RoleTitle.STUDENT,
            RoleTitle.STUDENT_TEACHER
          );
          break;
      }
    });
    // filter out all MessageRecipients variants
    payload.recipients = payload.recipients.filter((el) => !(Number(el) < 10));
    if (roles.length) {
      const users = await this.prisma.user.findMany({
        where: {
          role: {
            title: {
              in: roles,
            },
          },
        },
        select: { id: true },
      });
      payload.recipients.push(...users.map((el) => el.id));
    }
    const unique = new Set(payload.recipients);
    payload.recipients = Array.from(unique);
    this.publisher.publish(MESSAGES_SEND_FOR_EVENT, JSON.stringify(payload));
  }
}
