import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import { QuestionType, StudentLevel } from '@contests/types';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
class TagInput {
  @Field()
  title: string;
}

@InputType()
export class TagCreateInput {
  @Field(() => TagInput)
  create: { title: string };

  @Field(() => TagInput)
  where: { title: string };
}

@InputType()
class TagConnectInput {
  @Field(() => [TagCreateInput])
  connectOrCreate: { create: { title: string }; where: { title: string } }[];
}

@InputType()
export class CreateQuestionDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  correctAnswer: string;

  @Field()
  @IsOptional()
  @IsString()
  lesson?: string;

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

  @Field(() => TagConnectInput)
  @IsOptional()
  @IsObject()
  tags?: Prisma.TagCreateNestedManyWithoutQuestionsInput;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @Field(() => Boolean, { defaultValue: true, nullable: true })
  @IsOptional()
  @IsNumber()
  published?: boolean;
}
