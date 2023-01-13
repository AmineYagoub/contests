import {
  AnswerPaginationDto,
  CreateAnswerDto,
  UpdateAnswerDto,
} from '@contests/dto';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { AnswerPaginationResponse } from '../common/pagination.response';

import { Answer } from './answer.model';
import { AnswerService } from './answer.service';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}

  @Query(() => Answer, { nullable: true })
  async findOneAnswerById(@Args('id') id: string) {
    return this.answerService.findUnique({ id });
  }

  @Mutation(() => Answer, { nullable: true })
  async deleteAnswerById(@Args('id') id: string) {
    return this.answerService.delete({ id });
  }

  @Mutation(() => Answer)
  async createAnswer(@Args('data') data: CreateAnswerDto) {
    return this.answerService.create(data);
  }

  @Mutation(() => Answer)
  async updateAnswer(
    @Args('id') id: string,
    @Args('data') data: UpdateAnswerDto
  ) {
    return this.answerService.update({ data, where: { id } });
  }

  @Query(() => AnswerPaginationResponse, { nullable: true })
  async paginateAnswers(@Args('params') params: AnswerPaginationDto) {
    return this.answerService.paginate([], params);
  }

  /**
   * Resolve Answer type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.answerService.findUnique({ id: reference.id });
  }
}
