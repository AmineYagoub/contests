import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { QuestionType } from '@contests/types';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/contest-service';

type TagTitle = {
  title: string;
};

@InputType()
class TagInput {
  @Field()
  title: string;
}

@InputType()
class TagCreateInput {
  @Field(() => TagInput)
  create: TagTitle;

  @Field(() => TagInput)
  where: TagTitle;
}

@InputType()
export class TagConnectInput {
  @Field(() => [TagCreateInput])
  connectOrCreate: { create: TagTitle; where: TagTitle }[];
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

  @Field(() => TagConnectInput)
  @IsOptional()
  @IsObject()
  tags?: Prisma.TagCreateNestedManyWithoutQuestionsInput;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @Field(() => Boolean, { defaultValue: true, nullable: true })
  @IsOptional()
  @IsNumber()
  published?: boolean;
}
