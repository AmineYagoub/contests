import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { MembershipStatus as PrismaMembershipStatus } from '@prisma/auth-service';
import { MembershipStatus } from '@contests/types/auth';

@InputType()
export class UpdateTeacherSubscriptionDto {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  planId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  membershipId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field(() => MembershipStatus)
  @IsNotEmpty()
  @IsEnum(MembershipStatus)
  membershipStatus: PrismaMembershipStatus;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  renewCount?: number;
}
