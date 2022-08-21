import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
  providers: [TagResolver, TagService, PrismaService],
  exports: [TagService],
})
export class TagModule {}
