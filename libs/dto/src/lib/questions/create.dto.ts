import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { QuestionType } from '@contests/types';
import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/contest-service';

type TopicTitle = {
  title: string;
};

@InputType()
class TopicInput {
  @Field()
  title: string;
}

@InputType()
export class TopicConnectInput {
  @Field(() => [TopicInput])
  connect: TopicTitle[];
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

  @Field(() => QuestionType)
  @IsNotEmpty()
  @IsString()
  type: QuestionType;

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  options: string[];

  @Field(() => TopicConnectInput)
  @IsOptional()
  @IsObject()
  topics?: Prisma.TopicCreateNestedManyWithoutQuestionsInput;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @Field(() => Boolean, { defaultValue: true, nullable: true })
  @IsOptional()
  @IsNumber()
  published?: boolean;
}
