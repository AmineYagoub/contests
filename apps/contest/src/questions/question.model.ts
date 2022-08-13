import { QuestionType } from '@contests/types';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseModel } from '../common/base.model';

@ObjectType()
export class Question extends BaseModel {
  @Field({
    description: 'Identifies the title of the Question.',
  })
  title: string;

  @Field(() => QuestionType, {
    description: 'Identifies the Type of this Question.',
  })
  type: QuestionType;

  @Field(() => [String], {
    description: 'Identifies a list of ansewers of this Question.',
  })
  options: string[];

  @Field(() => Int, {
    description: 'Identifies how many questions in the Question.',
    nullable: true,
  })
  usedCount?: number;
}
