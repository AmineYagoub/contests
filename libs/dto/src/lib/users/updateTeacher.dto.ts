import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTeacherDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  country: string;

  @Field()
  @IsOptional()
  @IsString()
  phone: string;

  @Field()
  @IsOptional()
  @IsString()
  phoneCode: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;
}
