import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AnswerPaginationDto } from '@contests/dto';
import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Answer, Prisma } from '@prisma/contest-service';
import { STUDENTS_IDS_EVENT, STUDENTS_RESULTS_EVENT } from '@contests/types';

@Injectable()
export class AnswerService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis('publisher') private readonly publisher: Redis
  ) {}

  /**
   * Create a Answer
   *
   * @param data Prisma.AnswerCreateInput The Answer data.
   * @returns Promise<Answer>
   */
  async create(data: Prisma.AnswerCreateInput): Promise<Answer> {
    try {
      return this.prisma.answer.create({
        data,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Update a Answer
   *
   * @param params Prisma.AnswerUpdateInput The Answer data.
   * @returns Promise<Answer>
   */
  async update(params: {
    where: Prisma.AnswerWhereUniqueInput;
    data: Prisma.AnswerUpdateInput;
  }): Promise<Answer> {
    try {
      const { data, where } = params;
      return this.prisma.answer.update({
        data,
        where,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Delete a Answer
   *
   * @param where Prisma.AnswerWhereInput The Answer where input.
   * @returns  Promise<Answer>
   */
  async delete(where: Prisma.AnswerWhereUniqueInput): Promise<Answer> {
    try {
      return this.prisma.answer.delete({
        where,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Find a Answer by its unique key.
   *
   * @param input Prisma.AnswerWhereUniqueInput The unique key of the Answer.
   * @returns Promise<Answer | null>
   */
  async findUnique(
    input: Prisma.AnswerWhereUniqueInput
  ): Promise<Answer | null> {
    try {
      return this.prisma.answer.findUnique({
        where: input,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Paginate students answers.
   *
   * @param params Prisma.AnswerPaginationInput The pagination input.
   * @returns Promise<Prisma.Answer[]>
   */
  @OnEvent(STUDENTS_IDS_EVENT)
  async paginate(students: string[], params?: AnswerPaginationDto) {
    if (params?.where.id) {
      this.publisher.publish(
        STUDENTS_RESULTS_EVENT,
        JSON.stringify({ id: params?.where.id })
      );
    }
    const where = {
      userId: {
        in: students,
      },
    };
    const data = await this.prisma.$transaction([
      this.prisma.answer.count({ where }),
      this.prisma.answer.findMany({
        skip: params?.skip || 0,
        take: params?.take || 15,
        where,
        orderBy: { created: 'desc' },
      }),
    ]);
    return {
      total: data[0],
      data: data[1],
    };
  }
}
