import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';

@InputType()
export class ContactUsDto {
  @Field()
  @IsOptional()
  @IsString()
  title: string;

  @Field()
  @IsOptional()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  to: string;
}

@ObjectType()
export class ContactUsResponse {
  @Field(() => Int, { nullable: true })
  envelopeTime?: number;

  @Field(() => Int, { nullable: true })
  messageTime?: number;

  @Field(() => Int, { nullable: true })
  messageSize?: number;

  @Field({ nullable: true })
  messageId?: string;
}
