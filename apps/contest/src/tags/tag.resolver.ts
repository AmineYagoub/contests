import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { Tag } from './tag.model';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => Tag, { nullable: true })
  async findOneTagById(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findUnique({ id });
  }

  @Query(() => [Tag], { nullable: true })
  async findTags(@Args('title') title: string) {
    return this.tagService.findMany(title);
  }

  @Mutation(() => Tag, { nullable: true })
  async deleteTagById(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.delete({ id });
  }

  @Mutation(() => Tag)
  async createTag(@Args('title') title: string) {
    return this.tagService.create({ title });
  }

  @Mutation(() => Tag)
  async updateTag(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string
  ) {
    return this.tagService.update({ data: { title }, where: { id } });
  }

  /**
   * Resolve Tag type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }) {
    return this.tagService.findUnique({ id: reference.id });
  }
}
