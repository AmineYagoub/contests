import { Field, ObjectType } from '@nestjs/graphql';

import { User } from './user.model';

@ObjectType()
export class Contact {
  @Field(() => User, { description: 'user field' })
  user: User;

  @Field({ description: 'is user banned' })
  isBanned: boolean;
}
