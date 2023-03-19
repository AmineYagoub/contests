import { SelectedAnswerObject } from '@contests/types';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Contest } from '../contests/contest.model';
import { User } from '../users/user.entity';

@ObjectType()
export class Answer {
  @Field(() => ID)
  id: string;

  @Field({
    description: 'Identifies contest id related to this answer.',
  })
  contestId: string;

  @Field(() => Contest, {
    description: 'Identifies contest entity related to this answer.',
    nullable: true,
  })
  contest?: Contest;

  @Field(() => User, {
    description: 'Identifies the user id hwo submit this answer.',
  })
  userId: string;

  @Field({
    description:
      'Identifies the teacher id of the user hwo submit this answer.',
    nullable: true,
  })
  teacherId?: string;

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
