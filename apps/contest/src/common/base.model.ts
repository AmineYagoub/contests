import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user.entity';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean, {
    description: 'Identifies if the entity is published or not.',
  })
  published: boolean;

  @Field(() => User, {
    description: 'Identifies the author of the entity.',
  })
  authorId: string;

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  created: Date;

  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updated: Date;
}
