import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { Field, InputType, Int } from '@nestjs/graphql';

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

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  level: string[];

  @Field()
  @IsNotEmpty()
  @IsString()
  type: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  status: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

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

  @Field(() => Int, { defaultValue: 100, nullable: true })
  @IsOptional()
  @IsNumber()
  questionCount?: number;
}
