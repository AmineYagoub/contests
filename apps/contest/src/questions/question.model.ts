import { QuestionType } from '@contests/types';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseModel } from '../common/base.model';
import { Topic } from '../topics/topic.model';

@ObjectType()
export class Question extends BaseModel {
  @Field({
    description: 'Identifies the title of the Question.',
  })
  title: string;

  @Field({
    description: 'Identifies the correct answer for this Question.',
    nullable: true,
  })
  correctAnswer: string;

  @Field({
    description: 'Identifies the lesson learned from this Question.',
  })
  lesson: string;

  @Field(() => QuestionType, {
    description: 'Identifies the Type of this Question.',
  })
  type: QuestionType;

  @Field(() => [String], {
    description: 'Identifies a list of answers of this Question.',
  })
  options: string[];

  @Field(() => [Topic], {
    description: 'Identifies a list of topics that belongs to this Question.',
    nullable: true,
  })
  topics: Topic[];

  @Field(() => Int, {
    description: 'Identifies how many questions in the Question.',
    nullable: true,
  })
  usedCount?: number;
}
