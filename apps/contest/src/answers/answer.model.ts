import { SelectedAnswerObject } from '@contests/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Answer {
  @Field(() => ID)
  id: string;

  @Field({
    description: 'Identifies contest id related to this answer.',
  })
  contestId: string;

  @Field({
    description: 'Identifies the user id hwo submit this answer.',
  })
  userId: string;

  @Field(() => [SelectedAnswerObject], {
    description: 'Identifies the answer details.',
  })
  answers: SelectedAnswerObject[];

  @Field(() => Boolean, {
    description: 'Identifies if this answer is annulled.',
  })
  annulled: boolean;

  @Field({
    description: 'Identifies the annulation reason.',
  })
  annulledReason: string;

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
