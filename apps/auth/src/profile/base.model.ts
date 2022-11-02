import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseProfile {
  @Field(() => ID)
  id: string;

  @Field(() => Int, {
    description: 'Identifies the first name of the user.',
    nullable: true,
  })
  key?: number;

  @Field({
    description: 'Identifies the first name of the user.',
    nullable: true,
  })
  firstName?: string;

  @Field({
    description: 'Identifies the last name of the user.',
    nullable: true,
  })
  lastName?: string;

  @Field({
    description: 'Identifies the country of the user.',
    nullable: true,
  })
  country?: string;

  @Field({
    description: 'Identifies the avatar of the user.',
    nullable: true,
  })
  personalImage?: string;

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  dateOfBirth: Date;

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
