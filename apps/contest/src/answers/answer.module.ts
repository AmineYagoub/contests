import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';

@Module({
  providers: [AnswerResolver, AnswerService, PrismaService],
  exports: [AnswerService],
})
export class AnswerModule {}
