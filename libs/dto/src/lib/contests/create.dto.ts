import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import {
  ContestStatus,
  DictationQuestionLevel,
  StudentLevel,
} from '@contests/types';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/contest-service';

type TopicID = {
  id: string;
};

@InputType()
class TopicInputID {
  @Field()
  id: string;
}

@InputType()
class TopicConnectID {
  @Field(() => [TopicInputID])
  connect: TopicID[];
}

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

  @Field(() => [StudentLevel], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  level?: StudentLevel[];

  @Field(() => ContestStatus)
  @IsNotEmpty()
  @IsString()
  status: ContestStatus;

  @Field()
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @Field(() => TopicConnectID)
  @IsOptional()
  @IsObject()
  topics?: Prisma.TopicCreateNestedManyWithoutContestsInput;

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

  @Field(() => [String], { defaultValue: [], nullable: true })
  @IsOptional()
  @IsString({ each: true })
  participants?: string[];

  @Field(() => [String], { defaultValue: [], nullable: true })
  @IsOptional()
  @IsString({ each: true })
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

  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  dictationQuestionCount: number;

  @Field(() => DictationQuestionLevel, {
    nullable: true,
    defaultValue: DictationQuestionLevel.EMPTY,
  })
  @IsOptional()
  @IsString()
  dictationLevel: string;
}
