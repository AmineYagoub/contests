import { QuestionType } from '@contests/types';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseModel } from '../common/base.model';
import { Tag } from '../tags/tag.model';

@ObjectType()
export class Question extends BaseModel {
  @Field({
    description: 'Identifies the title of the Question.',
  })
  title: string;

  @Field({
    description: 'Identifies the correct answer for this Question.',
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
    description: 'Identifies a list of ansewers of this Question.',
  })
  options: string[];

  @Field(() => [Tag], {
    description: 'Identifies a list of tags that belongs to this Question.',
  })
  tags: Tag[];

  @Field(() => Int, {
    description: 'Identifies how many questions in the Question.',
    nullable: true,
  })
  usedCount?: number;
}
