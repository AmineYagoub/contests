import { OrderByType, PaginatedArgs } from '@contests/types';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateQuestionDto } from './create.dto';

@InputType()
export class WhereQuestionArgs extends PartialType(
  OmitType(CreateQuestionDto, ['authorId', 'published', 'topics'] as const)
) {
  @Field(() => [String], { nullable: true })
  created?: string[];

  @Field({ nullable: true })
  tags: string;
}

@InputType()
export class OrderQuestionArgs {
  @Field(() => OrderByType, { nullable: true })
  created?: OrderByType;

  @Field(() => OrderByType, { nullable: true })
  options?: OrderByType;

  @Field(() => OrderByType, { nullable: true })
  usedCount?: OrderByType;
}

@InputType()
export class QuestionPaginationDto extends PaginatedArgs(
  WhereQuestionArgs,
  OrderQuestionArgs
) {}
