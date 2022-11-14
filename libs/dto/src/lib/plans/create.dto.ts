import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  allowedContests: number;

  @Field(() => [String])
  @IsNotEmpty()
  @IsString({ each: true })
  options: string[];
}
