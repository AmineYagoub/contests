import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageService } from '../messages/message.service';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly messageService: MessageService) {}

  /**
   * Count all messages
   *
   * @param user User
   * @returns Promise<number>
   */
  @ResolveField(() => Int)
  async countAllMessages(@Parent() user: User) {
    return await this.messageService.countUnreadMessages(user.id, true);
  }

  /**
   * Count all notification.
   *
   * @param user User
   * @returns Promise<number>
   */
  @ResolveField(() => Int)
  async countAllNotifications(@Parent() user: User) {
    return await this.messageService.countUnreadMessages(user.id, false);
  }
}
