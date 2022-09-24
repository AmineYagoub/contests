import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';

import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  findUserById(@Args('id') id: string) {
    return this.userService.findUnique({ id });
  }

  /**
   * Resolve user type
   *
   * @param reference
   * @returns
   */
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.userService.findUnique({ id: reference.id });
  }
}
