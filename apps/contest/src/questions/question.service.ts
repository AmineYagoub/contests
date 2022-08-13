import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a Question
   *
   * @param data Prisma.QuestionCreateInput The Question data.
   * @returns Promise<Question>
   */
  async create(data: Prisma.QuestionCreateInput): Promise<Question> {
    return this.prisma.question.create({
      data,
    });
  }

  /**
   * Update a Question
   *
   * @param params Prisma.QuestionUpdateInput The Question data.
   * @returns Promise<Question>
   */
  async update(params: {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.QuestionUpdateInput;
  }): Promise<Question> {
    const { data, where } = params;
    return this.prisma.question.update({
      data,
      where,
    });
  }

  /**
   * Delete a Question
   *
   * @param where Prisma.QuestionWhereInput The Question where input.
   * @returns  Promise<Question>
   */
  async delete(where: Prisma.QuestionWhereUniqueInput): Promise<Question> {
    return this.prisma.question.delete({
      where,
    });
  }

  /**
   * Find a Question by its unique key.
   *
   * @param input Prisma.QuestionWhereUniqueInput The unique key of the Question.
   * @returns Promise<Question | null>
   */
  async findUnique(
    input: Prisma.QuestionWhereUniqueInput
  ): Promise<Question | null> {
    const Question = this.prisma.question.findUnique({
      where: input,
    });
    if (!Question) {
      throw new NotFoundException('Question not found');
    }
    return Question;
  }

  /**
   * Paginate contests
   *
   * @param params Prisma.ContestPaginationInput The pagination input.
   * @returns Promise<Prisma.Contest[]>
   */
  async paginate(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContestWhereUniqueInput;
    where?: Prisma.ContestWhereInput;
    orderBy?: Prisma.ContestOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where: w, orderBy } = params;
    const where = this.buildWhere(w);
    const sort = this.buildSorter(orderBy);
    const data = await this.prisma.$transaction([
      this.prisma.question.count({ where }),
      this.prisma.question.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy: sort,
      }),
    ]);
    return {
      total: data[0],
      data: data[1],
    };
  }

  /**
   * Build the orderBy input for the paginate query.
   *
   * @param orderBy Prisma.ContestOrderByWithRelationInput The Contest orderBy input.
   * @returns Prisma.ContestOrderByWithRelationInput The built orderBy input.
   */
  private buildSorter(orderBy: Prisma.ContestOrderByWithRelationInput) {
    return orderBy
      ? Object.entries(orderBy).map(([key, value]) => ({ [key]: value }))
      : { created: Prisma.SortOrder.desc };
  }

  /**
   * Build the where input for the paginate query.
   *
   * @param where Prisma.ContestWhereInput The Contest where input.
   *
   * @returns Prisma.ContestWhereInput The built where input.
   */
  private buildWhere(
    where?: Prisma.ContestWhereInput
  ): Prisma.ContestWhereInput {
    const filter: Prisma.ContestWhereInput = {};
    if (where) {
      for (const [key, value] of Object.entries(where)) {
        switch (key) {
          case 'title':
            filter.title = {
              contains: String(value),
            };
            break;
          case 'duration':
            filter.duration = Number(value);
            break;
          case 'level':
            filter.level = {
              array_contains: String(value),
            };
            break;
          case 'status':
            filter.status = String(value);
            break;
          case 'startTime':
            filter.startTime = {
              lte: new Date(value[1]),
              gte: new Date(value[0]),
            };
            break;
          case 'created':
            filter.created = {
              lte: new Date(value[1]),
              gte: new Date(value[0]),
            };
            break;
          default:
            break;
        }
      }
    }
    return filter;
  }
}
