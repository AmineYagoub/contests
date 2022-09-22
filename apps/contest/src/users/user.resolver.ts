import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { User } from './user.entity';

@Resolver(() => User)
export class UsersResolvers {
  constructor() {
    console.log();
  }

  /**
   * Count all unread messages
   *
   * @param user User
   * @returns Promise<number>
   */
  @ResolveField(() => Int)
  public countUnreadMessages(@Parent() user: User) {
    return 0;
  }

  /**
   * Count all unread notifications
   *
   * @param user User
   * @returns Promise<number>
   */
  @ResolveField(() => Int)
  public countUnreadNotifications(@Parent() user: User) {
    return 0;
  }
}
