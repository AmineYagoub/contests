import { sanitize } from 'isomorphic-dompurify';
import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { CreateMessageDto, UpdateMessageDto } from '@contests/dto';
import { Prisma } from '@prisma/contest-service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  MessageType,
  StudentUpdateTeacher,
  STUDENT_ADD_TEACHER_EVENT,
} from '@contests/types';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    @InjectRedis() private readonly client: Redis
  ) {
    this.client.subscribe(STUDENT_ADD_TEACHER_EVENT, (err, count) => {
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
   * Find last user messages to show in MessageDropdown.
   *
   * @param id string
   * @returns Promise<Message[]>
   */
  async findLastMessages(id: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            recipientId: id,
          },
          { sendToAll: true, authorId: { not: id } },
        ],
      },
      orderBy: { created: 'desc' },
      take: 20,
    });
  }

  /**
   * Count unread messages.
   *
   * @param id string
   * @returns Promise<number>
   */
  async countUnreadMessages(id: string): Promise<number> {
    return this.prisma.message.count({
      where: {
        OR: [
          {
            recipientId: id,
            viewed: false,
          },
          { sendToAll: true, viewers: { not: id } },
        ],
      },
    });
  }

  /**
   * Create new message.
   *
   * @param payload CreateMessageDto
   * @returns Promise<Message>
   */
  async create(payload: CreateMessageDto) {
    try {
      // FIXME inject admin id in list of viewers if sendToAll is true
      const { sendToAll, authorId, content } = payload;
      const viewers = [];
      if (sendToAll) {
        viewers.push(authorId);
      }
      payload.content = sanitize(content, {
        USE_PROFILES: { html: true },
      });

      return await this.prisma.message.create({
        data: { ...payload, viewers },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Delete Message.
   * @param id string
   * @returns Promise<Message>
   */
  async delete(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }

  /**
   * Update message to viewed stat from the recipient.
   *
   * @param payload UpdateMessageDto
   * @returns Promise<Message>
   */
  async updateMessageViewStat(payload: UpdateMessageDto) {
    const { meIds, viewed, allIds, viewerId } = payload;
    try {
      let result: Promise<Prisma.BatchPayload>;
      if (meIds.length > 0) {
        result = this.prisma.message.updateMany({
          where: { id: { in: meIds } },
          data: { viewed },
        });
      }
      if (allIds?.length > 0) {
        result = this.prisma.message.updateMany({
          where: { id: { in: allIds } },
          data: { viewers: { push: viewerId } },
        });
      }
      return result;
    } catch (err) {
      Logger.error(err);
    }
  }

  /**
   * Paginate all messages
   *
   * @param params Prisma.MessagePaginationInput The pagination input.
   * @returns Promise<Prisma.Message[]>
   */
  private async paginate(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MessageWhereUniqueInput;
    where?: Prisma.MessageWhereInput;
  }) {
    const { skip, take, cursor, where } = params;
    const data = await this.prisma.$transaction([
      this.prisma.message.count({ where }),
      this.prisma.message.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy: { created: 'desc' },
      }),
    ]);
    return {
      total: data[0],
      data: data[1],
    };
  }

  /**
   * Paginate messages
   *
   * @param params Prisma.MessagePaginationInput The pagination input.
   * @returns Promise<Prisma.Message[]>
   */
  async paginateMessages(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MessageWhereUniqueInput;
    where?: Prisma.MessageWhereInput;
  }) {
    params.where = {
      ...params.where,
      type: {
        equals: MessageType.MESSAGE,
      },
    };
    return this.paginate(params);
  }

  /**
   * Paginate Notifications
   *
   * @param params Prisma.MessagePaginationInput The pagination input.
   * @returns Promise<Prisma.Message[]>
   */
  async paginateNotifications(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MessageWhereUniqueInput;
    where?: Prisma.MessageWhereInput;
  }) {
    params.where = {
      ...params.where,
      type: {
        not: MessageType.MESSAGE,
      },
    };
    return this.paginate(params);
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
          type: MessageType.INFO,
          viewers: [],
          content: `إختارك الطالب ${payload.name} لتكون مشرفا عليه`,
        },
      });
    } catch (error) {
      Logger.log(error);
    }
  }
}
