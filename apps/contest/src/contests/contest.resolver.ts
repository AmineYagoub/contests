import {
  ContestPaginationDto,
  CreateContestDto,
  UpdateContestDto,
} from '@contests/dto';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { ContestPaginationResponce } from '../common/pagination.responce';
import { Contest } from './contest.model';
import { ContestService } from './contest.service';

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private contestService: ContestService) {}

  @Query(() => Contest, { nullable: true })
  async findOneContestById(
    @Args('id') id: string,
    @Args('isExam', {
      type: () => Boolean,
      defaultValue: false,
      nullable: true,
    })
    isExam?: boolean
  ) {
    return this.contestService.findUnique({ id }, isExam);
  }

  @Query(() => ContestPaginationResponce, { nullable: true })
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
    return this.contestService.findUnique({ id: reference.id }, false);
  }
}
