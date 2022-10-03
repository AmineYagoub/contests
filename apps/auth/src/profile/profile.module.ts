import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileResolver, ProfileService, PrismaService],
})
export class ProfileModule {}
