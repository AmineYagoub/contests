import { PermissionTitle, RoleTitle } from '@contests/types/auth';
import { getUsers } from '@contests/utils';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { PasswordService } from '../authentication/password.service';

@Injectable()
export class SeedService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  /**
   * Seed dummy data.
   *
   * @returns
   */
  private async seedUsers() {
    try {
      const { teachers, students } = await getUsers(
        this.passwordService.hashPassword
      );
      const res = [];
      for (const user of teachers) {
        res.push(
          await this.prisma.user.create({
            data: user,
            include: { profile: true },
          })
        );
      }
      let i = 0;
      for (const user of students) {
        if (
          user.role.connectOrCreate.where.title === RoleTitle.STUDENT_TEACHER
        ) {
          user.profile.create.teacher = {
            connect: {
              id: res[i].profile.id,
            },
          };
        }
        i++;
        res.push(await this.prisma.user.create({ data: user }));
        if (i > 5) {
          i = 0;
        }
      }
    } catch (error) {
      Logger.log(error);
    }
  }

  /**
   * Seed User roles to
   */
  private async seedRoles() {
    for (const [, val] of Object.entries(RoleTitle)) {
      await this.prisma.role.upsert({
        create: {
          title: val,
          permissions: {
            createMany: {
              skipDuplicates: true,
              data: this.buildPermission(val),
            },
          },
        },
        update: {
          title: val,
          permissions: {
            createMany: {
              skipDuplicates: true,
              data: this.buildPermission(val),
            },
          },
        },
        where: { title: val },
      });
    }
  }

  /**
   *
   * @param role RoleTitle
   * @returns
   */
  private buildPermission(role: RoleTitle) {
    let permission = [];
    switch (role) {
      case RoleTitle.ADMIN:
        permission = [
          PermissionTitle.ACCESS_DASHBOARD,
          PermissionTitle.VIEW_ANALYTICS,
          PermissionTitle.CREATE_CONTEST,
          PermissionTitle.VIEW_CONTEST_RESULT,
          PermissionTitle.VIEW_MESSAGES,
          PermissionTitle.VIEW_SETTINGS,
          PermissionTitle.VIEW_USERS,
          PermissionTitle.VIEW_ROLES_PERMISSIONS,
        ];
        break;
      case RoleTitle.GOLDEN_TEACHER:
        permission = [
          PermissionTitle.ACCESS_TEACHER_DASHBOARD,
          PermissionTitle.CREATE_CONTEST,
        ];
        break;
      case RoleTitle.TEACHER:
        permission = [PermissionTitle.ACCESS_TEACHER_DASHBOARD];
        break;
      case RoleTitle.STUDENT:
      case RoleTitle.STUDENT_TEACHER:
        permission = [PermissionTitle.ACCESS_STUDENT_DASHBOARD];
        break;
    }
    return permission.map((el) => ({ title: el }));
  }

  async seed() {
    await this.prisma.permission.deleteMany();
    await this.prisma.user.deleteMany();
    await this.prisma.role.deleteMany();
    await this.seedRoles();
    await this.seedUsers();
  }
}
