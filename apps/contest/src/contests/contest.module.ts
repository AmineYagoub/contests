import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { UsersResolvers } from '../users/user.resolver';
import { ContestResolver } from './contest.resolver';
import { ContestService } from './contest.service';

@Module({
  providers: [ContestResolver, UsersResolvers, ContestService, PrismaService],
  exports: [ContestService],
})
export class ContestModule {}
