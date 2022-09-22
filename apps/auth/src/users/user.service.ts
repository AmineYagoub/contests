import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
    console.log();
  }

  /**
   * Find a User by its unique key.
   *
   * @param input Prisma.UserWhereUniqueInput The unique key of the User.
   * @returns Promise<User | null>
   */
  async findUnique(input: Prisma.UserWhereUniqueInput) {
    try {
      return this.prisma.user.findUnique({
        where: input,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}
