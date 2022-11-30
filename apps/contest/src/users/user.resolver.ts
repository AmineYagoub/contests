import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageService } from '../messages/message.service';

import { User } from './user.entity';

@Resolver(() => User)
export class UsersResolvers {
  constructor(private readonly messageService: MessageService) {}

  /**
   * Count all unread messages
   *
   * @param user User
   * @returns Promise<number>
   */
  @ResolveField(() => Int)
  public countUnreadMessages(@Parent() user: User) {
    return this.messageService.countUnreadMessages(user.id);
  }
}
