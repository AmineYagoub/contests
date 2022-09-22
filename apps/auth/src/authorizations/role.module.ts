import { Module } from '@nestjs/common';

import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
