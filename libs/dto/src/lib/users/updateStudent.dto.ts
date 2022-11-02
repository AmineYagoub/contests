import { IsDate, IsNotEmpty, IsString } from 'class-validator';

import { RoleTitle, StudentLevel } from '@contests/types/auth';
import { isStudentHasTeacher } from '@contests/utils';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentDto {
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

  @Field(() => StudentLevel)
  @IsNotEmpty()
  @IsString()
  level: StudentLevel;

  @Field()
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

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
}
