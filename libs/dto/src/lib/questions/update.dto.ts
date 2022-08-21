import { IsNumber, IsOptional } from 'class-validator';

import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateQuestionDto } from './create.dto';

@InputType()
export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  usedCount?: number;
}
