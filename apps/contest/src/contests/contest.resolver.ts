import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {
  UpdateContestDto,
  CreateContestDto,
  ContestPaginationDto,
} from '@contests/dto';

import { Contest } from './contest.model';
import { User } from '../users/user.entity';
import { ContestService } from './contest.service';
import { TeacherDashboardResponse } from '@contests/types';
import { ContestPaginationResponse } from '../common/pagination.response';

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private contestService: ContestService) {}

  @Query(() => TeacherDashboardResponse, { nullable: true })
  async teacherDashboard(@Args('id') id: string) {
    return this.contestService.teacherDashboard(id);
  }

  @Query(() => Contest, { nullable: true })
  async findOneContestById(
    @Args('id') id: string,
    @Args('answerId', { nullable: true }) answerId?: string
  ) {
    return this.contestService.findUnique({ id }, answerId);
  }

  @Query(() => ContestPaginationResponse, { nullable: true })
  async paginateContest(@Args('params') params: ContestPaginationDto) {
    return this.contestService.paginate(params);
  }

  @Mutation(() => Contest)
  async createContest(@Args('input') data: CreateContestDto) {
    return this.contestService.create(data);
  }

  @Mutation(() => Contest, { nullable: true })
  async deleteContestById(@Args('id') id: string) {
    return this.contestService.delete({ id });
  }

  @Mutation(() => Contest)
  async updateContest(
    @Args('id') id: string,
    @Args('input') data: UpdateContestDto
  ) {
    return this.contestService.update({ data, where: { id } });
  }

  /**
   * Resolve Contest type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.contestService.findUnique({ id: reference.id });
  }

  /**
   * Resolve contest author.
   *
   * @param contest Contest
   * @returns
   */
  @ResolveField(() => User)
  authorId(@Parent() contest: Contest) {
    return { __typename: 'User', id: contest.authorId };
  }
}
