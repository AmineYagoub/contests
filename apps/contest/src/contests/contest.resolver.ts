import { ContestPaginationDto, CreateContestDto } from '@contests/dto';
import {
  Args,
  Int,
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
  async findOneContestById(@Args('id', { type: () => Int }) id: number) {
    return this.contestService.findUnique({ id });
  }

  @Query(() => ContestPaginationResponce, { nullable: true })
  async paginateContest(@Args('params') params: ContestPaginationDto) {
    return this.contestService.paginate(params);
  }

  @Mutation(() => Contest)
  async createContest(@Args('input') data: CreateContestDto) {
    return this.contestService.create(data);
  }

  /**
   * Resolve Contest type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }) {
    return this.contestService.findUnique({ id: reference.id });
  }
}
