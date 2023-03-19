import { StudentLevel } from '@contests/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Topic {
  @Field(() => ID)
  id: string;

  @Field({
    description: 'Identifies the title of the Topic.',
  })
  title: string;

  @Field(() => [StudentLevel], {
    description: 'Identifies the level of the Topic.',
  })
  level: StudentLevel[];

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
