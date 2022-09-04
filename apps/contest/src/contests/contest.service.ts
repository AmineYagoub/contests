import {
  PaginateContestParams,
  QuestionType,
  SelectedQuestionFields,
} from '@contests/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Contest, Prisma, Question } from '@prisma/client';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class ContestService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a Contest
   *
   * @param data Prisma.ContestCreateInput The Contest data.
   * @returns Promise<Contest>
   */
  async create(data: Prisma.ContestCreateInput): Promise<Contest> {
    const { tags, easyQuestionCount, mediumQuestionCount, hardQuestionCount } =
      data;

    const questions = await this.getConnectedQuestions(
      tags,
      easyQuestionCount,
      mediumQuestionCount,
      hardQuestionCount
    );
    const results = questions.length
      ? {
          ...data,
          questions: {
            connect: questions,
          },
        }
      : data;
    return await this.prisma.contest.create({
      data: results,
    });
  }

  /**
   * @returns
   */
  private async getConnectedQuestions(
    tags: Prisma.TagCreateNestedManyWithoutContestsInput,
    easy: number,
    mid: number,
    hard: number
  ): Promise<SelectedQuestionFields[]> {
    const topics = (
      tags.connectOrCreate as Array<{
        create: { title: string };
      }>
    ).map((el) => el.create.title);
    const questions = await this.prisma.question.findMany({
      where: {
        tags: {
          every: {
            title: {
              in: topics,
            },
          },
        },
      },
      select: {
        id: true,
        type: true,
      },
    });
    const easyQuestions = this.getQuestionsRandomly(
      questions,
      QuestionType.EASY,
      easy
    );
    const midQuestions = this.getQuestionsRandomly(
      questions,
      QuestionType.MEDIUM,
      mid
    );
    const hardQuestions = this.getQuestionsRandomly(
      questions,
      QuestionType.HARD,
      hard
    );
    return [...easyQuestions, ...midQuestions, ...hardQuestions];
  }

  /**
   * Get random questions on specific type.
   *
   * @param arr SelectedQuestionFields[]
   * @param type QuestionType
   * @param take number
   * @returns SelectedQuestionFields[]
   */
  private getQuestionsRandomly(
    arr: SelectedQuestionFields[],
    type: QuestionType,
    take: number
  ): SelectedQuestionFields[] {
    const shuffled = arr
      .filter((el) => el.type === type)
      .sort(() => 0.5 - Math.random());
    return shuffled.slice(0, take).map(({ id }) => ({
      id,
    }));
  }

  /**
   * Update a Contest
   *
   * @param params Prisma.ContestUpdateInput The Contest data.
   * @returns Promise<Contest>
   */
  async update(params: {
    where: Prisma.ContestWhereUniqueInput;
    data: Prisma.ContestUpdateInput;
  }): Promise<Contest> {
    const { data, where } = params;
    return this.prisma.contest.update({
      data,
      where,
    });
  }

  /**
   * Delete a Contest
   *
   * @param where Prisma.ContestWhereInput The Contest where input.
   * @returns  Promise<Contest>
   */
  async delete(where: Prisma.ContestWhereUniqueInput): Promise<Contest> {
    return this.prisma.contest.delete({
      where,
    });
  }

  /**
   * Find a Contest by its unique key.
   *
   * @param input Prisma.ContestWhereUniqueInput The unique key of the Contest.
   * @returns Promise<Contest | null>
   */
  async findUnique(
    input: Prisma.ContestWhereUniqueInput,
    answerId?: string
  ): Promise<Contest | null> {
    const contest = await this.prisma.contest.findUnique({
      where: input,
      include: {
        tags: true,
        questions: true,
        answers: {
          where: {
            id: answerId,
          },
        },
      },
    });
    if (!contest) {
      throw new NotFoundException('contest not found');
    }
    if (!answerId) {
      const { questions } = contest;
      contest.questions = this.normalizeQuestions(questions);
    }
    return contest;
  }

  /**
   * Sort and shuffle answers.
   *
   * @param questions Question[]
   * @returns Question[]
   */
  private normalizeQuestions(questions: Question[]) {
    const order = {
      [QuestionType.EASY]: 1,
      [QuestionType.MEDIUM]: 2,
      [QuestionType.HARD]: 3,
    };
    const sorted = questions.sort((a, b) => order[a.type] - order[b.type]);
    const shuffled = sorted.map((el) => {
      const { options, correctAnswer, ...rest } = el;
      const allOptions = [...(options as Array<string>), correctAnswer]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      return {
        options: this.normalizeOptions(allOptions),
        ...rest,
      } as Question;
    });
    return shuffled;
  }

  /**
   *
   * @param options
   * @returns
   */
  private normalizeOptions(options: string[]) {
    while (options.length < 4) {
      options.push('empty');
    }
    return options.map((opt) => opt.replace(/\r/g, ' '));
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
    includeQuestions?: boolean;
  }) {
    const { skip, take, cursor, where: w, orderBy, includeQuestions } = params;
    const where = this.buildWhere(w);
    const sort = this.buildSorter(orderBy);
    const findArgs: PaginateContestParams = {
      skip,
      take,
      cursor,
      where,
      orderBy: sort as Prisma.ContestOrderByWithRelationInput,
      include: {
        tags: true,
      },
    };
    if (includeQuestions) {
      findArgs.include.questions = true;
    }
    const data = await this.prisma.$transaction([
      this.prisma.contest.count({ where }),
      this.prisma.contest.findMany(findArgs),
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
    const entries = Object.entries(orderBy ?? {});
    return entries.length
      ? entries.map(([key, value]) => ({ [key]: value }))
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

    if (where && Object.entries(where).length) {
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
