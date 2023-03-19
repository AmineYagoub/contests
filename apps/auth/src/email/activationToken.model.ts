import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../users/user.model';

@ObjectType()
export class ActivationToken {
  @Field(() => ID)
  id: string;

  @Field(() => User, {
    description: 'Identifies the Token owner',
  })
  user: User;

  @HideField()
  value: string;

  @Field({
    description: 'Identifies the date and time when the token was created.',
  })
  created: Date;

  @Field({
    description: 'Identifies the date and time when the token was updated.',
  })
  updated: Date;
}
