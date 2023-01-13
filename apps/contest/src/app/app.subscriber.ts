import {
  STUDENTS_IDS_EVENT,
  CONTEST_CREATED_EVENT,
  MESSAGES_SEND_FOR_EVENT,
  CONTEST_CREATED_FOR_EVENT,
  STUDENT_ADD_TEACHER_EVENT,
  TEACHER_CONNECT_STUDENT_EVENT,
} from '@contests/types';
import { Redis } from 'ioredis';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AppSubscribeToEvents {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRedis() private readonly client: Redis
  ) {
    this.client.subscribe(
      CONTEST_CREATED_EVENT,
      MESSAGES_SEND_FOR_EVENT,
      CONTEST_CREATED_FOR_EVENT,
      STUDENT_ADD_TEACHER_EVENT,
      TEACHER_CONNECT_STUDENT_EVENT,
      STUDENTS_IDS_EVENT,
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
}
