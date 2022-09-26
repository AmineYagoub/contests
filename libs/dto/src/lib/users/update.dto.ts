import { IsOptional, IsString } from 'class-validator';

import { RoleTitle } from '@contests/types';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/auth-service';

import { SignUpDto } from '../auth/signup.dto';

@InputType()
export class UpdateUserDto extends PartialType(
  OmitType(SignUpDto, ['role'] as const)
) {
  @Field(() => RoleTitle, { nullable: true })
  @IsOptional()
  @IsString()
  role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
}
