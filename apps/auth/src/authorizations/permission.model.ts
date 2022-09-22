import { PermissionTitle } from '@contests/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Permission {
  @Field(() => ID)
  id: string;

  @Field(() => PermissionTitle, {
    description: 'Identifies the unique name of the Permission.',
  })
  title: PermissionTitle;

  @Field({
    description: 'Identifies the description of the Permission.',
    nullable: true,
  })
  description?: string;
}
