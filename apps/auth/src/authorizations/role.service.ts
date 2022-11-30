import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { Prisma } from '@prisma/auth-service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find a Role by its unique key.
   *
   * @param input Prisma.RoleWhereUniqueInput The unique key of the Role.
   * @returns Promise<Role | null>
   */
  async findUnique(input: Prisma.RoleWhereUniqueInput) {
    try {
      return this.prisma.role.findUniqueOrThrow({
        where: input,
        include: { permissions: true },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Find all Roles.
   *
   * @returns Promise<Role[]>
   */
  async findAll() {
    try {
      return this.prisma.role.findMany({ include: { permissions: true } });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Link or unlink permission with role.
   *
   * @param role Prisma.RoleWhereUniqueInput
   * @param permission Prisma.PermissionWhereUniqueInput
   * @param link boolean
   * @returns Promise<Role>
   */
  async linkPermissionsWithRole(
    role: Prisma.RoleWhereUniqueInput,
    permission: Prisma.PermissionWhereUniqueInput,
    link: boolean
  ) {
    try {
      return this.prisma.role.update({
        where: role,
        data: {
          permissions: link
            ? {
                connect: permission,
              }
            : {
                disconnect: permission,
              },
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
