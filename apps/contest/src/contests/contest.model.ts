import { ContestStatus, ContestType } from '@contests/types';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseModel } from '../common/base.model';
import { Tag } from '../tags/tag.model';

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

  @Field(() => ContestType, {
    description: 'Identifies the Type of this Contest.',
  })
  type: ContestType;

  @Field(() => [Tag], {
    description: 'Identifies a list of tags that belongs to this Question.',
  })
  tags: Tag[];

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

  @Field(() => [String], {
    description:
      'Identifies a list of countries that can be allowed to join this Contest.',
    nullable: true,
  })
  countries?: string[];

  @Field(() => Int, {
    description: 'Identifies how many questions in the Contest.',
  })
  questionCount: number;

  @Field(() => Int, {
    description: 'Identifies the max number of Participants in the Contest.',
  })
  maxParticipants: number;
}
