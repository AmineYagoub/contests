import { Injectable } from '@nestjs/common';
import { AnswerPaginationDto } from '@contests/dto';
import { PrismaService } from '../app/prisma.service';
import { Answer, Prisma } from '@prisma/contest-service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { STUDENT_SUBMIT_ANSWER_EVENT } from '@contests/types';

@Injectable()
export class AnswerService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2
  ) {}

  /**
   * Create a Answer
   *
   * @param data Prisma.AnswerCreateInput The Answer data.
   * @returns Promise<Answer>
   */
  async create(
    data: Prisma.AnswerCreateInput,
    teacherProfileId: string
  ): Promise<Answer> {
    try {
      const answer = await this.prisma.answer.create({
        data,
        include: { contest: true },
      });
      this.eventEmitter.emit(STUDENT_SUBMIT_ANSWER_EVENT, {
        contestId: answer.contestId,
        contestTitle: answer.contest.title,
        answerId: answer.id,
        teacherId: answer.teacherId,
        userId: answer.userId,
        teacherProfileId,
      });
      return answer;
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
  async paginate(params?: AnswerPaginationDto) {
    const { where, skip, take } = params;
    const data = await this.prisma.$transaction([
      this.prisma.answer.count({ where }),
      this.prisma.answer.findMany({
        skip,
        take,
        where,
        orderBy: { created: 'desc' },
        include: { contest: true },
      }),
    ]);
    return {
      total: data[0],
      data: data[1],
    };
  }
}
