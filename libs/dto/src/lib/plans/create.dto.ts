import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateSubscriptionPlansDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  subTitle: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Field(() => Int, { nullable: true, defaultValue: -1 })
  @IsOptional()
  @IsNumber()
  allowedContests?: number;

  @Field(() => Int, { nullable: true, defaultValue: -1 })
  @IsOptional()
  @IsNumber()
  period?: number;

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  options: string[];
}
