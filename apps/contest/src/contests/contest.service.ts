import {
  QuestionType,
  CONTEST_CREATED_EVENT,
  PaginateContestParams,
  SelectedQuestionFields,
} from '@contests/types';
import Redis from 'ioredis';
import { Contest } from './contest.model';
import { PrismaService } from '../app/prisma.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Prisma, Question } from '@prisma/contest-service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ContestService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis('publisher') private readonly client: Redis
  ) {}

  /**
   * Count contests to display result in teacher dashboard.
   *
   * @param id string Teacher id.
   * @returns PromisePromise<{
                                meTotal: number;
                                total: number;
                            }>
   */
  async teacherDashboard(id: string) {
    const data = await this.prisma.$transaction([
      this.prisma.contest.count({ where: { authorId: id } }),
      this.prisma.contest.count(),
    ]);
    return {
      meTotal: data[0],
      total: data[1],
    };
  }

  /**
   * Create a Contest
   *
   * @param data Prisma.ContestCreateInput The Contest data.
   * @returns Promise<Contest>
   */
  async create(data: Prisma.ContestCreateInput) {
    const {
      topics,
      easyQuestionCount,
      mediumQuestionCount,
      hardQuestionCount,
      dictationLevel,
      dictationQuestionCount,
    } = data;

    const questions = await this.getConnectedQuestions(
      topics,
      easyQuestionCount,
      mediumQuestionCount,
      hardQuestionCount,
      dictationLevel,
      dictationQuestionCount
    );

    const results = questions.length
      ? {
          ...data,
          questions: {
            connect: questions,
          },
        }
      : data;

    const created = await this.prisma.contest.create({
      data: results,
    });
    // TODO UPDATE CONTEST TO PUSH PARTICIPANTS
    this.client.publish(
      CONTEST_CREATED_EVENT,
      JSON.stringify({
        contestId: created.id,
        contestTitle: created.title,
        authorId: created.authorId,
        level: data.level,
        participants: data.participants,
      })
    );
    return created;
  }

  /**
   * Get random list of dictation questions.
   *
   * dictationLevel: DictationQuestionLevel,
   * count: number
   *
   * @returns Promise<SelectedQuestionFields[]>
   */
  private async getDictationQuestions(
    dictationLevel: string,
    count: number
  ): Promise<SelectedQuestionFields[]> {
    const questions = await this.prisma.question.findMany({
      where: {
        AND: [
          {
            dictationLevel: dictationLevel,
          },
          {
            type: QuestionType.DICTATION,
          },
        ],
      },
      select: {
        id: true,
        type: true,
      },
    });
    return this.getQuestionsRandomly(questions, QuestionType.DICTATION, count);
  }

  /**
   * Get random list of questions.
   *
   * topic: Prisma.TopicCreateNestedManyWithoutContestsInput,
   * easy: number,
   * mid: number,
   * hard: number
   *
   * @returns Promise<SelectedQuestionFields[]>
   */
  private async getConnectedQuestions(
    topic: Prisma.TopicCreateNestedManyWithoutContestsInput,
    easy: number,
    mid: number,
    hard: number,
    dictationLevel: string,
    dictationQuestionCount: number
  ): Promise<SelectedQuestionFields[]> {
    const topics = (
      topic.connect as Array<{
        id: string;
      }>
    ).map((el) => el.id);
    const questions = await this.prisma.question.findMany({
      where: {
        topics: {
          every: {
            id: {
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
    const dictationQuestions = await this.getDictationQuestions(
      dictationLevel,
      dictationQuestionCount
    );
    return [
      ...easyQuestions,
      ...midQuestions,
      ...dictationQuestions,
      ...hardQuestions,
    ];
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
  }) {
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
  async delete(where: Prisma.ContestWhereUniqueInput) {
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
  async findUnique(input: Prisma.ContestWhereUniqueInput, answerId?: string) {
    const contest = await this.prisma.contest.findUnique({
      where: input,
      include: {
        topics: true,
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
      [QuestionType.DICTATION]: 3,
      [QuestionType.HARD]: 4,
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
   * Add empty options.
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
    includeAnswers?: boolean;
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
        topics: true,
      },
    };
    if (includeQuestions) {
      findArgs.include.questions = true;
    }
    const answerBy = (w as any)?.answerBy;
    if (answerBy) {
      findArgs.include.answers = true;
    }
    const data = await this.prisma.$transaction([
      this.prisma.contest.count({ where }),
      this.prisma.contest.findMany(findArgs),
    ]);
    let result = [];
    if (answerBy) {
      data[1].forEach((el) => {
        result.push({
          ...el,
          answers: (el as Contest).answers.filter((c) => c.userId === answerBy),
        });
      });
    } else {
      result = data[1];
    }
    return {
      total: data[0],
      data: result,
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
          case 'participants':
            filter.participants = {
              array_contains: value[0],
            };
            break;
          case 'answerBy':
            filter.answers = {
              some: {
                userId: String(value),
              },
            };
            break;
          case 'noAnswerBy':
            filter.answers = {
              none: {
                userId: String(value),
              },
            };
            break;
          case 'authorId':
            filter.authorId = String(value);
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
