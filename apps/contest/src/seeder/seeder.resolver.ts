import { Mutation, Resolver } from '@nestjs/graphql';
import { Contest } from '../contests/contest.model';

import { SeederService } from './seeder.service';

@Resolver(() => Contest)
export class SeederResolver {
  constructor(private seedService: SeederService) {}

  @Mutation(() => Boolean, { nullable: true })
  async seedContest() {
    return this.seedService.seedContest();
  }
}
