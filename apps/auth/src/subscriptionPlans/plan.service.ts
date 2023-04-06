import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/auth-service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { PrismaService } from '../app/prisma.service';
import { UPDATE_MEMBERSHIP } from './membership.consumer';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    @InjectQueue(UPDATE_MEMBERSHIP) private updateQueue: Queue,
    private prisma: PrismaService
  ) {}

  /**
   * Update All ended teacher memberships to free plan.
   *
   * @returns Promise<Bull.Job<any>>
   */
  async updateMembershipsJob() {
    return await this.updateQueue.add(null, {
      repeat: {
        cron: '0 0 * * *', // job every midnight
      },
      attempts: 3,
    });
  }

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
   * Find a Membership by Teacher profile id.
   *
   * @param id string Teacher profile id.
   * @returns Promise<Membership | null>
   */
  async findMembershipByProfileId(id: string) {
    try {
      return await this.prisma.membership.findFirst({
        where: {
          profileId: id,
        },
        include: { memberShipOn: true },
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
   * Create a MemberShip
   *
   * @param data Prisma.MembershipCreateInput The MembershipCreateInput data.
   * @returns Promise<Membership>
   */
  async createMemberShip(data: Prisma.MembershipCreateInput) {
    try {
      return this.prisma.membership.create({
        data,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  /**
   * Update a MemberShip
   *
   * @param params Prisma.MembershipUpdateInput The MembershipUpdateInput data.
   * @returns Promise<Membership>
   */
  async updateMemberShip(params: {
    where: Prisma.MembershipWhereUniqueInput;
    data: Prisma.MembershipUpdateInput;
  }) {
    try {
      const { data, where } = params;
      return this.prisma.membership.update({
        data,
        where,
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
