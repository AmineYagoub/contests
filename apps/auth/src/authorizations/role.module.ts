import { Module } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [],
  providers: [RoleResolver, RoleService, PrismaService],
  exports: [RoleService],
})
export class RoleModule {}
