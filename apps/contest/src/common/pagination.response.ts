import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Answer } from '../answers/answer.model';

import { Contest } from '../contests/contest.model';
import { Message } from '../messages/message.model';
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
export class ContestPaginationResponse extends Paginate(Contest) {}

@ObjectType()
export class QuestionPaginationResponse extends Paginate(Question) {}

@ObjectType()
export class MessagePaginationResponse extends Paginate(Message) {}

@ObjectType()
export class AnswerPaginationResponse extends Paginate(Answer) {}
