import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import { SelectedAnswerInput } from '@contests/types';
import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/contest-service';

type AnswerIdType = {
  id: string;
};
@InputType()
class AnswerInput {
  @Field()
  id: string;
}

@InputType()
class ContestConnectInput {
  @Field(() => AnswerInput)
  connect: AnswerIdType;
}

@InputType()
export class CreateAnswerDto {
  @Field(() => ContestConnectInput)
  @IsNotEmpty()
  @IsObject()
  contest: Prisma.ContestCreateNestedOneWithoutAnswersInput;

  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  teacherId?: string;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  @IsOptional()
  @IsNumber()
  annulled?: boolean;

  @Field({ defaultValue: '', nullable: true })
  @IsOptional()
  @IsString()
  annulledReason?: string;

  @Field(() => [SelectedAnswerInput])
  @IsOptional()
  @IsArray()
  answers: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;
}
