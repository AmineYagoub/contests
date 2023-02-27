import {
  CreateQuestionDto,
  QuestionPaginationDto,
  UpdateQuestionDto,
} from '@contests/dto';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { QuestionPaginationResponse } from '../common/pagination.response';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query(() => Question, { nullable: true })
  async findOneQuestionById(@Args('id') id: string) {
    return this.questionService.findUnique({ id });
  }

  @Mutation(() => Question, { nullable: true })
  async deleteQuestionById(@Args('id') id: string) {
    return this.questionService.delete({ id });
  }

  @Query(() => QuestionPaginationResponse, { nullable: true })
  async paginateQuestions(@Args('params') params: QuestionPaginationDto) {
    return this.questionService.paginate(params);
  }

  @Mutation(() => Question)
  async createQuestion(@Args('input') data: CreateQuestionDto) {
    console.log(data.topics.connect);
    return this.questionService.create(data);
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Args('id') id: string,
    @Args('input') data: UpdateQuestionDto
  ) {
    return this.questionService.update({ data, where: { id } });
  }

  /**
   * Resolve Question type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.questionService.findUnique({ id: reference.id });
  }
}
