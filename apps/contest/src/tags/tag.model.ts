import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field({
    description: 'Identifies the title of the Tag.',
  })
  title: string;

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
