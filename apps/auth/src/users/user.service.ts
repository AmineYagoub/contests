import { UpdateUserDto } from '@contests/dto';
import { RoleTitle } from '@contests/types';
import {
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';
import { PasswordService } from '../authentication/password.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly passwordService: PasswordService
  ) {}

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
   * Search teachers by name.
   *
   * @param name string
   * @returns
   */
  async findTeacher(name?: string): Promise<User[]> {
    try {
      return this.prisma.user.findMany({
        take: name ? 100 : 15,
        where: {
          AND: {
            isActive: true,
            role: {
              title: {
                in: [RoleTitle.GOLDEN_TEACHER, RoleTitle.TEACHER],
              },
            },
            profile: name
              ? {
                  OR: [
                    { firstName: { contains: name } },
                    { lastName: { contains: name } },
                  ],
                }
              : {},
          },
        },
        include: {
          role: true,
          profile: true,
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
    data: UpdateUserDto;
  }) {
    const { data, where } = params;
    if (data.password) {
      const user = await this.prisma.user.findUniqueOrThrow({
        where,
      });
      if (!user.isActive) {
        throw new UnauthorizedException('User Banned');
      }
      const passwordValid = await this.passwordService.validatePassword(
        String(data.currentPassword),
        user.password
      );

      if (!passwordValid) {
        throw new UnprocessableEntityException('Invalid Password');
      }
      delete data.currentPassword;
      data.password = await this.passwordService.hashPassword(
        String(data.password)
      );
    }
    return this.prisma.user.update({
      data,
      where,
    });
  }
}
