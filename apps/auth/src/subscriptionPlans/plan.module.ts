import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { PasswordService } from '../authentication/password.service';
import { SubscriptionPlanResolver } from './plan.resolver';
import { SubscriptionPlanService } from './plan.service';
import { BullModule } from '@nestjs/bull';
import { MembershipConsumer, UPDATE_MEMBERSHIP } from './membership.consumer';
import { PlanEvents } from './plan.events';

@Module({
  imports: [
    BullModule.registerQueue({
      name: UPDATE_MEMBERSHIP,
    }),
  ],
  providers: [
    MembershipConsumer,
    SubscriptionPlanResolver,
    SubscriptionPlanService,
    PrismaService,
    PasswordService,
    PlanEvents,
  ],
  exports: [SubscriptionPlanService],
})
export class SubscriptionPlanModule {}
