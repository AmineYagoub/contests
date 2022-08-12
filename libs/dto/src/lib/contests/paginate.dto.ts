import { IsNumber, IsObject, IsOptional, Max, Min } from 'class-validator';

import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';

import { CreateContestDto } from './create.dto';

@InputType()
export class WhereType extends PartialType(
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
export class OrderType {
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
export class PaginateContestDto {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @Field(() => Int, { nullable: true, defaultValue: 15 })
  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(100)
  take?: number;

  @Field(() => WhereType, { nullable: true })
  @IsOptional()
  @IsObject()
  where?: object;

  @Field(() => OrderType, { nullable: true })
  @IsOptional()
  @IsObject()
  orderBy?: object;
}
