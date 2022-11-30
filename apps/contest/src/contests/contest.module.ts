import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { ContestResolver } from './contest.resolver';
import { ContestService } from './contest.service';

@Module({
  providers: [ContestResolver, ContestService, PrismaService],
  exports: [ContestService],
})
export class ContestModule {}
