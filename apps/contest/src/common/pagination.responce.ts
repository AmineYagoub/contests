import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Contest } from '../contests/contest.model';
import { Question } from '../questions/question.model';

function Paginate<T>(Node: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginateType {
    @Field(() => Int)
    total: number;

    @Field(() => [Node], { nullable: true })
    data: T[];
  }
  return PaginateType;
}

@ObjectType()
export class ContestPaginationResponce extends Paginate(Contest) {}

@ObjectType()
export class QuestionPaginationResponce extends Paginate(Question) {}
