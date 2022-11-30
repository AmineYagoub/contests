import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { ContestStatus, ContestType, StudentLevel } from '@contests/types';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/contest-service';

import { TagConnectInput } from '../questions/create.dto';

@InputType()
export class CreateContestDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => Int, { nullable: true, defaultValue: 40 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;

  @Field(() => [StudentLevel])
  @IsNotEmpty()
  @IsString({ each: true })
  level: StudentLevel[];

  @Field(() => ContestType)
  @IsNotEmpty()
  @IsString()
  type: ContestType;

  @Field(() => ContestStatus)
  @IsNotEmpty()
  @IsString()
  status: ContestStatus;

  @Field()
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @Field(() => TagConnectInput)
  @IsOptional()
  @IsObject()
  tags?: Prisma.TagCreateNestedManyWithoutContestsInput;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @Field(() => Boolean, { defaultValue: true, nullable: true })
  @IsOptional()
  @IsNumber()
  published?: boolean;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  @IsOptional()
  @IsNumber()
  maxParticipants?: number;

  @Field(() => [Int], { defaultValue: [], nullable: true })
  @IsOptional()
  @IsArray()
  participants?: number[];

  @Field(() => [String], { defaultValue: [], nullable: true })
  @IsOptional()
  @IsArray()
  countries?: string[];

  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  easyQuestionCount: number;

  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  mediumQuestionCount: number;

  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  hardQuestionCount: number;
}
