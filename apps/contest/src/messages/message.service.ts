import {
  SendMessageDto,
  CreateMessageDto,
  UpdateMessageDto,
} from '@contests/dto';
import { Prisma } from '@prisma/contest-service';
import {
  MessageType,
  MessageRecipients,
  MESSAGES_SEND_EVENT,
} from '@contests/types';
import { Redis } from 'ioredis';
import { sanitize } from 'isomorphic-dompurify';
import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis('publisher') private readonly client: Redis
  ) {}

  /**
   * Find last user messages to show in MessageDropdown.
   *
   * @param id string
   * @param isMessages boolean
   * @returns Promise<Message[]>
   */
  private async findLast(isMessages: boolean, id?: string) {
    const where: Prisma.MessageWhereInput = {
      type: isMessages
        ? MessageType.MESSAGE
        : {
            not: MessageType.MESSAGE,
          },
    };
    console.log(id);
    if (id) {
      where.OR = [
        {
          recipientId: id,
        },
        {
          recipients: {
            array_contains: id,
          },
        },
      ];
    }
    return this.prisma.message.findMany({
      where,
      orderBy: { created: 'desc' },
      take: 20,
    });
  }

  /**
   * Find last user messages to show in MessageDropdown.
   *
   * @param id string
   * @returns Promise<Message[]>
   */
  async findLastMessages(id: string) {
    return this.findLast(true, id);
  }

  /**
   * Find last user Notification to show in NotificationDropdown.
   *
   * @param id string
   * @returns Promise<Message[]>
   */
  async findLastNotifications(id?: string) {
    return this.findLast(false, id);
  }

  /**
   * Count unread messages.
   *
   * @param user User
   * @param isMessages boolean
   *
   * @returns Promise<number>
   *
   */
  async countUnreadMessages(isMessages: boolean, id?: string): Promise<number> {
    const where: Prisma.MessageWhereInput = {
      type: isMessages
        ? MessageType.MESSAGE
        : {
            not: MessageType.MESSAGE,
          },
    };
    if (id) {
      where.OR = [
        {
          recipientId: id,
        },
        {
          recipients: {
            array_contains: id,
          },
        },
      ];
    }
    return await this.prisma.message.count({
      where,
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
      const { content } = payload;
      payload.content = sanitize(content, {
        USE_PROFILES: { html: true },
      });
      return await this.prisma.message.create({
        data: { ...payload, recipients: [] },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Send notifications.
   *
   * @param payload SendMessageDto
   * @returns Promise<Message>
   */
  async sendNotifications(payload: SendMessageDto) {
    try {
      const { recipients, content } = payload;
      payload.content = sanitize(content, {
        USE_PROFILES: { html: true },
      });
      if (
        [
          MessageRecipients.ALL,
          MessageRecipients.FREE_STUDENTS,
          MessageRecipients.FREE_TEACHERS,
          MessageRecipients.GOLDEN_TEACHERS,
          MessageRecipients.TEACHERS,
          MessageRecipients.STUDENTS,
          MessageRecipients.STUDENTS_TEACHERS,
        ].some((el) => recipients.includes(String(el)))
      ) {
        this.client.publish(MESSAGES_SEND_EVENT, JSON.stringify(payload));
        return Promise.resolve();
      }

      return await this.prisma.message.create({
        data: payload,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Delete Message.
   *
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
    const { meIds, viewed } = payload;
    try {
      let result: Promise<Prisma.BatchPayload>;
      if (meIds.length > 0) {
        result = this.prisma.message.updateMany({
          where: { id: { in: meIds } },
          data: { viewed },
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
    const { authorId, recipientId } = params.where;
    params.where = {
      OR: [
        { authorId, recipientId },
        { recipientId: authorId, authorId: recipientId },
      ],
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
    if (!params.where.recipientId) {
      delete params.where.recipientId;
    } else {
      params.where = {
        OR: [
          { recipientId: params.where.recipientId },
          { recipients: { array_contains: params.where.recipientId } },
        ],
      };
    }
    params.where = {
      ...params.where,
      type: {
        not: MessageType.MESSAGE,
      },
    };
    return this.paginate(params);
  }
}
