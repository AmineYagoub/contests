import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestResolver } from './contest.resolver';
import { PrismaService } from '../app/prisma.service';

@Module({
  providers: [ContestResolver, ContestService, PrismaService],
  exports: [ContestService],
})
export class ContestModule {}
