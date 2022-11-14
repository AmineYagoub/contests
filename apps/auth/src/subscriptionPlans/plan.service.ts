import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/auth-service';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class SubscriptionPlanService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find a SubscriptionPlans by its unique key.
   *
   * @param input Prisma.SubscriptionPlansWhereUniqueInput The unique key of the SubscriptionPlans.
   * @returns Promise<SubscriptionPlans | null>
   */
  async findUnique(input: Prisma.SubscriptionPlansWhereUniqueInput) {
    try {
      return await this.prisma.subscriptionPlans.findUniqueOrThrow({
        where: input,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Create a SubscriptionPlans
   *
   * @param data Prisma.SubscriptionPlansCreateInput The SubscriptionPlans data.
   * @returns Promise<SubscriptionPlans>
   */
  async create(data: Prisma.SubscriptionPlansCreateInput) {
    try {
      return this.prisma.subscriptionPlans.create({
        data,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Update a SubscriptionPlans
   *
   * @param params Prisma.SubscriptionPlansUpdateInput The SubscriptionPlans data.
   * @returns Promise<SubscriptionPlans>
   */
  async update(params: {
    where: Prisma.SubscriptionPlansWhereUniqueInput;
    data: Prisma.SubscriptionPlansUpdateInput;
  }) {
    try {
      const { data, where } = params;
      return this.prisma.subscriptionPlans.update({
        data,
        where,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Delete a SubscriptionPlans
   *
   * @param where Prisma.SubscriptionPlansWhereInput The SubscriptionPlans where input.
   * @returns  Promise<SubscriptionPlans>
   */
  async delete(where: Prisma.SubscriptionPlansWhereUniqueInput) {
    try {
      return this.prisma.subscriptionPlans.delete({
        where,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Find all SubscriptionPlans
   *
   * @returns  Promise<SubscriptionPlans[]>
   */
  async findAll() {
    try {
      return this.prisma.subscriptionPlans.findMany({
        orderBy: {
          price: 'asc',
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
