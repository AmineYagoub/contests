import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find a User by its unique key.
   *
   * @param input Prisma.UserWhereUniqueInput The unique key of the User.
   * @returns Promise<User | null>
   */
  async findUnique(input: Prisma.UserWhereUniqueInput) {
    try {
      return this.prisma.user.findUniqueOrThrow({
        where: input,
        include: {
          role: true,
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Update a User
   *
   * @param params Prisma.UserUpdateInput The User data.
   * @returns Promise<User>
   */
  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }
}
