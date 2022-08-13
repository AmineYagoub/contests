import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';

import PaginatedArgs from '../types/pagination';
import { CreateQuestionDto } from './create.dto';

@InputType()
export class WhereQuestionArgs extends PartialType(
  OmitType(CreateQuestionDto, ['authorId', 'published'] as const)
) {
  @Field(() => [String], { nullable: true })
  created?: string[];
}

@InputType()
export class OrderQuestionArgs {
  @Field({ nullable: true })
  created?: string;

  @Field(() => Int, { nullable: true })
  usedCount?: number;
}

@InputType()
export class QuestionPaginationDto extends PaginatedArgs(
  WhereQuestionArgs,
  OrderQuestionArgs
) {}
