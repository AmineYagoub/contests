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
   * @param params Prisma.QuestionPaginationInput The pagination input.
   * @returns Promise<Prisma.Question[]>
   */
  async paginate(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuestionWhereUniqueInput;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput;
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
        include: {
          tags: true,
        },
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
   * @param orderBy Prisma.QuestionOrderByWithRelationInput The Question orderBy input.
   * @returns Prisma.QuestionOrderByWithRelationInput The built orderBy input.
   */
  private buildSorter(orderBy: Prisma.QuestionOrderByWithRelationInput) {
    return orderBy
      ? Object.entries(orderBy).map(([key, value]) => ({ [key]: value }))
      : { created: Prisma.SortOrder.desc };
  }

  /**
   * Build the where input for the paginate query.
   *
   * @param where Prisma.QuestionWhereInput The Question where input.
   *
   * @returns Prisma.QuestionWhereInput The built where input.
   */
  private buildWhere(
    where?: Prisma.QuestionWhereInput
  ): Prisma.QuestionWhereInput {
    const filter: Prisma.QuestionWhereInput = {};
    if (where) {
      for (const [key, value] of Object.entries(where)) {
        switch (key) {
          case 'title':
            filter.title = {
              contains: String(value),
            };
            break;
          case 'type':
            filter.type = String(value);
            break;
          case 'tags':
            filter.tags = {
              some: {
                title: {
                  contains: String(value),
                },
              },
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
