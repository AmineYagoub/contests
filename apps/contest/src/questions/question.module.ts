import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';

@Module({
  providers: [QuestionResolver, QuestionService, PrismaService],
  exports: [QuestionService],
})
export class QuestionModule {}
