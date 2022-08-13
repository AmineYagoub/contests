import { CreateQuestionDto, QuestionPaginationDto } from '@contests/dto';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { QuestionPaginationResponce } from '../common/pagination.responce';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query(() => Question, { nullable: true })
  async findOneQuestionById(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findUnique({ id });
  }

  @Query(() => QuestionPaginationResponce, { nullable: true })
  async paginateQuestions(@Args('params') params: QuestionPaginationDto) {
    return this.questionService.paginate(params);
  }

  @Mutation(() => Question)
  async createQuestion(@Args('input') data: CreateQuestionDto) {
    return this.questionService.create(data);
  }

  /**
   * Resolve Question type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }) {
    return this.questionService.findUnique({ id: reference.id });
  }
}
