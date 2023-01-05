import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { ContestEvents } from './contest.events';
import { ContestResolver } from './contest.resolver';
import { ContestService } from './contest.service';

@Module({
  providers: [ContestResolver, ContestService, PrismaService, ContestEvents],
  exports: [ContestService],
})
export class ContestModule {}
