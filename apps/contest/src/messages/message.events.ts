import {
  MessageType,
  ContestCreatedEvent,
  StudentUpdateTeacher,
  TeacherConnectStudent,
  MESSAGES_SEND_FOR_EVENT,
  CONTEST_CREATED_WILDCARD,
  STUDENT_ADD_TEACHER_EVENT,
  TEACHER_CONNECT_STUDENT_EVENT,
  STUDENT_SUBMIT_ANSWER_EVENT,
  StudentSubmitAnswer,
} from '@contests/types';
import { SendMessageDto } from '@contests/dto';
import { OnEvent } from '@nestjs/event-emitter';
import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

@Injectable()
export class MessageEvents {
  constructor(private prisma: PrismaService) {}

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
   * Notify admin and teacher when Student submit his answer.
   *
   * @param payload: StudentSubmitAnswer
   *
   * @returns Promise<Message>
   */
  @OnEvent(STUDENT_SUBMIT_ANSWER_EVENT)
  async onStudentSubmitAnswerEvent(payload: StudentSubmitAnswer) {
    try {
      const data = {
        content: `أنهى المشاركة في مسابقة (<a href="/profile/results/${payload.answerId}?cid=${payload.contestId}">${payload.contestTitle}</a>)`,
        authorId: payload.userId,
        type: MessageType.INFO,
        recipients: [payload.teacherProfileId],
      };
      return this.prisma.message.create({
        data,
      });
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
