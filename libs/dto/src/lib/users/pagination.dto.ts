import { OrderByType, PaginatedArgs } from '@contests/types';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { UpdateStudentDto } from './updateStudent.dto';

@InputType()
export class WhereUserArgs extends PartialType(
  OmitType(UpdateStudentDto, ['dateOfBirth', 'teacherId'] as const)
) {
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
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
