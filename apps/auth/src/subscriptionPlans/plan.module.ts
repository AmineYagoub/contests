import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { PasswordService } from '../authentication/password.service';
import { SubscriptionPlanResolver } from './plan.resolver';
import { SubscriptionPlanService } from './plan.service';

@Module({
  providers: [
    SubscriptionPlanResolver,
    SubscriptionPlanService,
    PrismaService,
    PasswordService,
  ],
  exports: [SubscriptionPlanService],
})
export class SubscriptionPlanModule {}
