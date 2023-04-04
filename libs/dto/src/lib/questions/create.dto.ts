import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { DictationQuestionLevel, QuestionType } from '@contests/types';
import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/contest-service';

type TopicTitle = {
  title: string;
};

@InputType()
class TopicInputTitle {
  @Field()
  title: string;
}

@InputType()
class TopicConnectTitle {
  @Field(() => [TopicInputTitle])
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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lesson?: string;

  @Field(() => QuestionType, { nullable: true })
  @IsOptional()
  @IsString()
  type?: QuestionType;

  @Field(() => DictationQuestionLevel, {
    nullable: true,
    defaultValue: DictationQuestionLevel.EMPTY,
  })
  @IsOptional()
  @IsString()
  dictationLevel?: DictationQuestionLevel;

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  options: string[];

  @Field(() => TopicConnectTitle, { nullable: true })
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
