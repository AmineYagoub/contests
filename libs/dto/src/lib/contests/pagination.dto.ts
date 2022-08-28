import { OrderByType, PaginatedArgs } from '@contests/types';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateContestDto } from './create.dto';

@InputType()
export class WhereContestArgs extends PartialType(
  OmitType(CreateContestDto, [
    'authorId',
    'maxParticipants',
    'published',
    'duration',
    'easyQuestionCount',
    'mediumQuestionCount',
    'hardQuestionCount',
    'startTime',
    'tags',
  ] as const)
) {
  @Field(() => [String], { nullable: true })
  created?: string[];

  @Field(() => [String], { nullable: true })
  startTime?: string[];

  @Field({ nullable: true })
  tags: string;
}

@InputType()
export class OrderContestArgs {
  @Field(() => OrderByType, { nullable: true })
  created?: OrderByType;

  @Field(() => OrderByType, { nullable: true })
  startTime?: OrderByType;

  @Field(() => OrderByType, { nullable: true })
  participants?: OrderByType;

  @Field(() => OrderByType, { nullable: true })
  duration?: OrderByType;
}

@InputType()
export class ContestPaginationDto extends PaginatedArgs(
  WhereContestArgs,
  OrderContestArgs
) {
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  includeQuestions?: boolean;
}
