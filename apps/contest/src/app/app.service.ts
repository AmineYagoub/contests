import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/contest-service';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {
    prisma.appConfig.findFirst().then((res) => {
      if (!res) {
        prisma.appConfig.create({
          data: {
            agreement: 'سياسة الإستخدام',
          },
        });
      }
    });
  }

  /**
   * Create a AppConfig
   *
   * @param data Prisma.AppConfigCreateInput The AppConfig data.
   * @returns Promise<AppConfig>
   */
  async create(data: Prisma.AppConfigCreateInput) {
    try {
      return this.prisma.appConfig.create({
        data,
      });
    } catch (error) {
      Logger.error(error.message);
    }
  }

  /**
   * Update a AppConfig
   *
   * @param data: Prisma.AppConfigUpdateInput The AppConfig data.
   * @returns Promise<AppConfig>
   */
  async update(data: Prisma.AppConfigUpdateInput) {
    try {
      return this.prisma.appConfig.update({
        data,
        where: { id: '1' },
      });
    } catch (error) {
      Logger.error(error.message);
    }
  }

  /**
   * Find a AppConfig by its unique key.
   *
   * @returns Promise<AppConfig | null>
   */
  async find() {
    try {
      return this.prisma.appConfig.findFirst();
    } catch (error) {
      Logger.error(error.message);
    }
  }
}
