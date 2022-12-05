import { StudentLevel } from '@contests/types';
import { isPublic } from '@contests/utils';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { SeedService } from '../app/seed.service';

import { Topic } from './topic.model';
import { TopicService } from './topic.service';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(
    private topicService: TopicService,
    private seedService: SeedService
  ) {}

  @isPublic()
  @Mutation(() => Boolean, { nullable: true })
  async seedCtsData() {
    return this.seedService.seedCts();
  }

  @Query(() => Topic, { nullable: true })
  async findOneTopicById(@Args('id') id: string) {
    return this.topicService.findUnique({ id });
  }

  @Query(() => [Topic], { nullable: true })
  async findTopics(
    @Args('title', { nullable: true, defaultValue: '' }) title?: string,
    @Args('level', { type: () => [StudentLevel], nullable: true })
    level?: StudentLevel[]
  ) {
    return this.topicService.findMany(title, level);
  }

  @Mutation(() => Topic, { nullable: true })
  async deleteTopicById(@Args('id') id: string) {
    return this.topicService.delete({ id });
  }

  @Mutation(() => Topic)
  async updateTopic(@Args('id') id: string, @Args('title') title: string) {
    return this.topicService.update({ data: { title }, where: { id } });
  }

  /**
   * Resolve Topic type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.topicService.findUnique({ id: reference.id });
  }
}
