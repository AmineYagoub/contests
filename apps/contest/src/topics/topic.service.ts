import { StudentLevel } from '@contests/types';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Topic } from '@prisma/contest-service';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a Topic
   *
   * @param data Prisma.TopicCreateInput The Topic data.
   * @returns Promise<Topic>
   */
  async create(data: Prisma.TopicCreateInput): Promise<Topic> {
    try {
      return this.prisma.topic.create({
        data,
      });
    } catch (error) {
      Logger.error(error.message);
    }
  }

  /**
   * Update a Topic
   *
   * @param params Prisma.TopicUpdateInput The Topic data.
   * @returns Promise<Topic>
   */
  async update(params: {
    where: Prisma.TopicWhereUniqueInput;
    data: Prisma.TopicUpdateInput;
  }): Promise<Topic> {
    try {
      const { data, where } = params;
      return this.prisma.topic.update({
        data,
        where,
      });
    } catch (error) {
      Logger.error(error.message);
    }
  }

  /**
   * Delete a Topic
   *
   * @param where Prisma.TopicWhereInput The Topic where input.
   * @returns  Promise<Topic>
   */
  async delete(where: Prisma.TopicWhereUniqueInput): Promise<Topic> {
    try {
      return this.prisma.topic.delete({
        where,
      });
    } catch (error) {
      Logger.error(error.message);
    }
  }

  /**
   * Find a Topic by its unique key.
   *
   * @param input Prisma.TopicWhereUniqueInput The unique key of the Topic.
   * @returns Promise<Topic | null>
   */
  async findUnique(input: Prisma.TopicWhereUniqueInput): Promise<Topic | null> {
    try {
      return this.prisma.topic.findUnique({
        where: input,
      });
    } catch (error) {
      Logger.error(error.message);
    }
  }

  /**
   * Find a Topic by title and level key.
   *
   * @param title string The unique key of the Topic.
   * @param level StudentLevel[]
   *
   * @returns Promise<Topic[]>
   */
  async findMany(title?: string, level?: StudentLevel[]) {
    try {
      return this.prisma.topic.groupBy({
        by: ['title', 'level', 'id'],
        where: {
          title: {
            contains: String(title),
          },
          level: {
            array_contains: level,
          },
        },
      });
    } catch (error) {
      Logger.error(error.message);
    }
  }
}
