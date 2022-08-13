import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import PaginatedArgs from '../types/pagination';
import { CreateContestDto } from './create.dto';

@InputType()
export class WhereContestArgs extends PartialType(
  OmitType(CreateContestDto, [
    'authorId',
    'maxParticipants',
    'published',
    'startTime',
  ] as const)
) {
  @Field(() => [String], { nullable: true })
  created?: string[];

  @Field(() => [String], { nullable: true })
  startTime?: string[];
}

@InputType()
export class OrderContestArgs {
  @Field({ nullable: true })
  created?: string;

  @Field({ nullable: true })
  startTime?: string;

  @Field({ nullable: true })
  participants?: string;

  @Field({ nullable: true })
  duration?: string;
}

@InputType()
export class ContestPaginationDto extends PaginatedArgs(
  WhereContestArgs,
  OrderContestArgs
) {}
