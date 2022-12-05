import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { SeedService } from '../app/seed.service';
import { TopicResolver } from './topic.resolver';
import { TopicService } from './topic.service';

@Module({
  providers: [TopicResolver, TopicService, PrismaService, SeedService],
  exports: [TopicService],
})
export class TopicModule {}
