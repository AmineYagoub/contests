import { OrderByType, PaginatedArgs } from '@contests/types';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateAnswerDto } from './create.dto';

@InputType()
export class WhereAnswerArgs extends PartialType(
  OmitType(CreateAnswerDto, ['userId'] as const)
) {}

@InputType()
export class OrderAnswerArgs {
  @Field(() => OrderByType, { nullable: true })
  created?: OrderByType;
}

@InputType()
export class AnswerPaginationDto extends PaginatedArgs(
  WhereAnswerArgs,
  OrderAnswerArgs
) {}
