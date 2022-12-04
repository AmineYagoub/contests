import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  MessageType,
  StudentUpdateTeacher,
  STUDENT_ADD_TEACHER_EVENT,
  TeacherConnectStudent,
  TEACHER_CONNECT_STUDENT_EVENT,
} from '@contests/types';

@Injectable()
export class MessageEvents {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    @InjectRedis() private readonly client: Redis
  ) {
    this.client.subscribe(
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
          sendToAll: false,
          type: MessageType.REQUEST,
          viewers: [],
          content: `إختارك الطالب ${payload.name} لتكون مشرفا عليه`,
        },
      });
    } catch (error) {
      Logger.log(error);
    }
  }

  /**
   * Send Notification to teacher.
   *
   * @param payload: StudentUpdateTeacher
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
          sendToAll: false,
          type: MessageType.INFO,
          viewers: [],
          content: `تم قبول طلبك من طرف المعلم ${payload.name} لتكون مشرفا عليه`,
        },
      });
    } catch (error) {
      Logger.log(error);
    }
  }
}
