import { OrderByType, PaginatedArgs, RoleTitle } from '@contests/types';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { UpdateStudentDto } from './updateStudent.dto';

@InputType()
export class WhereUserArgs extends PartialType(
  OmitType(UpdateStudentDto, ['dateOfBirth', 'teacherId', 'role'] as const)
) {
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field(() => Boolean, { nullable: true })
  emailConfirmed?: boolean;

  @Field(() => [RoleTitle])
  @IsString({ each: true })
  role: RoleTitle[];
}

@InputType()
export class OrderUserArgs {
  @Field(() => OrderByType, { nullable: true })
  created?: OrderByType;
}

@InputType()
export class UserPaginationDto extends PaginatedArgs(
  WhereUserArgs,
  OrderUserArgs
) {}
