import { RoleTitle } from '@contests/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Permission } from './permission.model';

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field(() => RoleTitle, {
    description: 'Identifies the unique name of the role.',
  })
  title: string;

  @Field({
    description: 'Identifies the description of the role.',
    nullable: true,
  })
  description?: string;

  @Field(() => [Permission], {
    description: 'Identifies list of permissions associated whit this role.',
    nullable: true,
  })
  permissions?: Permission[];
}
