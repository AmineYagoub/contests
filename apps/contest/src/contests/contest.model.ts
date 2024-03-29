import {
  ContestStatus,
  DictationQuestionLevel,
  StudentLevel,
} from '@contests/types';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Answer } from '../answers/answer.model';
import { BaseModel } from '../common/base.model';
import { Question } from '../questions/question.model';
import { Topic } from '../topics/topic.model';

@ObjectType()
export class Contest extends BaseModel {
  @Field({
    description: 'Identifies the title of the Contest.',
  })
  title: string;

  @Field(() => Int, {
    description: 'Identifies the duration of the Contest.',
  })
  duration: number;

  @Field(() => [StudentLevel], {
    description: 'Identifies a list of levels that can be join this Contest.',
    nullable: true,
  })
  level?: StudentLevel[];

  @Field(() => [Topic], {
    description: 'Identifies a list of topics that belongs to this contest.',
    nullable: true,
  })
  topics: Topic[];

  @Field(() => [Answer], {
    description: 'Identifies a list of answers that belongs to this contest.',
    nullable: true,
  })
  answers: Answer[];

  @Field(() => ContestStatus, {
    description: 'Identifies the status of the Contest.',
  })
  status: ContestStatus;

  @Field({
    description: 'Identifies the date and time when contest started.',
  })
  startTime: Date;

  @Field(() => [String], {
    description: 'Identifies a list of users ids that joins this contest.',
    nullable: true,
  })
  participants?: string[];

  @Field(() => [Question], {
    description:
      'Identifies a list of questions ids that connected to this contest.',
    nullable: true,
  })
  questions?: Question[];

  @Field(() => [String], {
    description:
      'Identifies a list of countries that can be allowed to join this Contest.',
    nullable: true,
  })
  countries?: string[];

  @Field(() => Int, {
    description: 'Identifies how many easy questions in the Contest.',
  })
  easyQuestionCount: number;

  @Field(() => Int, {
    description: 'Identifies how many medium questions in the Contest.',
  })
  mediumQuestionCount: number;

  @Field(() => Int, {
    description: 'Identifies how many hard questions in the Contest.',
  })
  hardQuestionCount: number;

  @Field(() => Int, {
    description: 'Identifies how many dictation questions in the Contest.',
  })
  dictationQuestionCount: number;

  @Field(() => DictationQuestionLevel, {
    description: 'Identifies the level of this dictation Question.',
  })
  dictationLevel: DictationQuestionLevel;

  @Field(() => Int, {
    description: 'Identifies the max number of Participants in the Contest.',
    nullable: true,
  })
  maxParticipants: number;
}
