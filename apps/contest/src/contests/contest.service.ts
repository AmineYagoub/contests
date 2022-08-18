import { Injectable, NotFoundException } from '@nestjs/common';
import { Contest, Prisma } from '@prisma/client';

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
    return this.prisma.contest.create({
      data,
    });
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
    input: Prisma.ContestWhereUniqueInput
  ): Promise<Contest | null> {
    const contest = this.prisma.contest.findUnique({
      where: input,
    });
    if (!contest) {
      throw new NotFoundException('contest not found');
    }
    return contest;
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
      this.prisma.contest.count({ where }),
      this.prisma.contest.findMany({
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
    const entries = Object.entries(orderBy);
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
    console.log(filter);
    return filter;
  }
}
