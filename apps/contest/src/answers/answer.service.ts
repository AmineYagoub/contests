import { Injectable } from '@nestjs/common';
import { Answer, Prisma } from '@prisma/contest-service';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

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
}
