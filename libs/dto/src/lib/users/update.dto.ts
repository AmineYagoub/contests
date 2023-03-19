import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Field, InputType, PartialType } from '@nestjs/graphql';

import { SignUpDto } from '../auth/signup.dto';

@InputType()
export class UpdateUserDto extends PartialType(SignUpDto) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  currentPassword: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
