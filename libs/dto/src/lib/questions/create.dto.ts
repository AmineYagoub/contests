import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { QuestionType, StudentLevel } from '@contests/types';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateQuestionDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => [StudentLevel])
  @IsNotEmpty()
  @IsString({ each: true })
  level: StudentLevel[];

  @Field(() => QuestionType)
  @IsNotEmpty()
  @IsString()
  type: QuestionType;

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  options: string[];

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @Field(() => Boolean, { defaultValue: true, nullable: true })
  @IsOptional()
  @IsNumber()
  published?: boolean;
}
