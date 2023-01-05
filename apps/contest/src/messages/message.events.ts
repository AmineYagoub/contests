import {
  MessageType,
  ContestCreatedEvent,
  StudentUpdateTeacher,
  CONTEST_CREATED_EVENT,
  TeacherConnectStudent,
  MESSAGES_SEND_FOR_EVENT,
  CONTEST_CREATED_WILDCARD,
  CONTEST_CREATED_FOR_EVENT,
  STUDENT_ADD_TEACHER_EVENT,
  TEACHER_CONNECT_STUDENT_EVENT,
} from '@contests/types';
import Redis from 'ioredis';
import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SendMessageDto } from '@contests/dto';

@Injectable()
export class MessageEvents {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    @InjectRedis() private readonly client: Redis
  ) {
    this.client.subscribe(
      CONTEST_CREATED_EVENT,
      MESSAGES_SEND_FOR_EVENT,
      CONTEST_CREATED_FOR_EVENT,
      STUDENT_ADD_TEACHER_EVENT,
      TEACHER_CONNECT_STUDENT_EVENT,
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
   * Send Notification to teacher.
   *
   * @param payload: StudentUpdateTeacher
   *
   * @returns Promise<Message>
   */
  @OnEvent(STUDENT_ADD_TEACHER_EVENT)
  async sendNotificationToTeacher(payload: StudentUpdateTeacher) {
    try {
      return this.prisma.message.create({
        data: {
          recipientId: payload.teacherId,
          authorId: payload.userId,
          type: MessageType.REQUEST,
          recipients: [],
          content: `إختارك الطالب ${payload.name} لتكون مشرفا عليه`,
        },
      });
    } catch (error) {
      Logger.log(error);
    }
  }

  /**
   * Send Notification to student.
   *
   * @param payload: TeacherConnectStudent
   *
   * @returns Promise<Message>
   */
  @OnEvent(TEACHER_CONNECT_STUDENT_EVENT)
  async onTeacherConnectStudent(payload: TeacherConnectStudent) {
    try {
      return this.prisma.message.create({
        data: {
          recipientId: payload.studentId,
          authorId: payload.teacherId,
          type: MessageType.INFO,
          recipients: [],
          content: `تم قبول طلبك من طرف المعلم ${payload.name} ليكون مشرفا عليك`,
        },
      });
    } catch (error) {
      Logger.log(error);
    }
  }

  /**
   * Send Notification to participants.
   *
   * @param payload: ContestCreatedEvent
   *
   * @returns Promise<Message>
   */
  @OnEvent(CONTEST_CREATED_WILDCARD)
  async onContestCreatedEvent(payload: ContestCreatedEvent) {
    try {
      const data = {
        content: `تم إختيارك للمشاركة في مسابقة (<a href="/profile/contests/${payload.contestId}">${payload.contestTitle}</a>) نتمنى لك حظاً موفقا`,
        authorId: payload.authorId,
        type: MessageType.INFO,
        recipients: [],
      };
      if (payload.participants?.length) {
        await this.prisma.message.create({
          data: {
            ...data,
            recipients: payload.participants,
          },
        });
      }
    } catch (error) {
      Logger.log(error);
    }
  }

  /**
   * Admin or teacher Send Notification to multiple users.
   *
   * @param payload: SendMessageDto
   *
   * @returns Promise<Message>
   */
  @OnEvent(MESSAGES_SEND_FOR_EVENT)
  async onNotificationSentEvent(payload: SendMessageDto) {
    try {
      await this.prisma.message.create({
        data: payload,
      });
    } catch (error) {
      Logger.log(error);
    }
  }
}
