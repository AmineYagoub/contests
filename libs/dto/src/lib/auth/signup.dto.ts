import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { RoleTitle } from '@contests/types';
import {
  isAcceptAgreement,
  isPasswordMatch,
  isStudentHasTeacher,
} from '@contests/utils';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpDto {
  @Field()
  @IsNotEmpty()
  @IsEmail({
    message: 'email_invalid',
  })
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'password_invalid',
  })
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/g)
  password: string;

  @Field()
  @IsString()
  @isPasswordMatch('password', {
    message: 'password_unmatched',
  })
  confirmPassword: string;

  @Field(() => RoleTitle)
  @IsNotEmpty()
  @IsString()
  role: RoleTitle;

  @Field({
    nullable: true,
  })
  @isStudentHasTeacher('role', {
    message: 'teacherId_invalid',
  })
  teacherId?: string;

  @Field()
  @isAcceptAgreement({
    message: 'agreement_invalid',
  })
  agreement: boolean;
}
