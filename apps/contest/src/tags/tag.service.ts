import { Injectable } from '@nestjs/common';
import { Prisma, Tag } from '@prisma/client';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a Tag
   *
   * @param data Prisma.TagCreateInput The Tag data.
   * @returns Promise<Tag>
   */
  async create(data: Prisma.TagCreateInput): Promise<Tag> {
    try {
      return this.prisma.tag.create({
        data,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Update a Tag
   *
   * @param params Prisma.TagUpdateInput The Tag data.
   * @returns Promise<Tag>
   */
  async update(params: {
    where: Prisma.TagWhereUniqueInput;
    data: Prisma.TagUpdateInput;
  }): Promise<Tag> {
    try {
      const { data, where } = params;
      return this.prisma.tag.update({
        data,
        where,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Delete a Tag
   *
   * @param where Prisma.TagWhereInput The Tag where input.
   * @returns  Promise<Tag>
   */
  async delete(where: Prisma.TagWhereUniqueInput): Promise<Tag> {
    try {
      return this.prisma.tag.delete({
        where,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Find a Tag by its unique key.
   *
   * @param input Prisma.TagWhereUniqueInput The unique key of the Tag.
   * @returns Promise<Tag | null>
   */
  async findUnique(input: Prisma.TagWhereUniqueInput): Promise<Tag | null> {
    try {
      return this.prisma.tag.findUnique({
        where: input,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Find a Tag by its unique key.
   *
   * @param title string The unique key of the Tag.
   * @returns Promise<Tag | null>
   */
  async findMany(title: string): Promise<Tag[]> {
    try {
      return this.prisma.tag.findMany({
        where: {
          title: {
            contains: title,
          },
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}
