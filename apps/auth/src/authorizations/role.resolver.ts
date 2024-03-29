import { Resolver } from '@nestjs/graphql';

import { Role } from './role.model';
import { RoleService } from './role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}
}
