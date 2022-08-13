import { IsNumber, IsObject, IsOptional, Max, Min } from 'class-validator';

import { Type } from '@nestjs/common';
import { Field, InputType, Int } from '@nestjs/graphql';

export default function PaginatedArgs<WhereI, OrderI>(
  WhereIClass: Type<WhereI>,
  OrderIClass: Type<OrderI>
): any {
  @InputType({ isAbstract: true })
  abstract class PaginateType {
    @Field(() => Int, { nullable: true, defaultValue: 0 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    skip?: number;

    @Field(() => Int, { nullable: true, defaultValue: 15 })
    @IsOptional()
    @IsNumber()
    @Min(5)
    @Max(500)
    take?: number;

    @Field(() => WhereIClass, { nullable: true })
    @IsOptional()
    @IsObject()
    where?: WhereI;

    @Field(() => OrderIClass, { nullable: true })
    @IsOptional()
    @IsObject()
    orderBy?: OrderI;
  }
  return PaginateType;
}
