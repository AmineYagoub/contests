import { OrderByType, PaginatedArgs } from '@contests/types';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateMessageDto } from './create.dto';

@InputType()
export class WhereMessageArgs extends PartialType(
  OmitType(CreateMessageDto, ['content'] as const)
) {}

@InputType()
export class OrderMessageArgs {
  @Field(() => OrderByType, { nullable: true })
  created?: OrderByType;
}

@InputType()
export class MessagePaginationDto extends PaginatedArgs(
  WhereMessageArgs,
  OrderMessageArgs
) {}
