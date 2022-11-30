import { CreateMessageDto, UpdateMessageDto } from '@contests/dto';
import { BatchPayloadResult } from '@contests/types';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Mutation(() => Message)
  async createMessage(@Args('input') data: CreateMessageDto) {
    return this.messageService.create(data);
  }

  @Mutation(() => BatchPayloadResult)
  async updateMessageViewStat(@Args('input') data: UpdateMessageDto) {
    return this.messageService.updateMessageViewStat(data);
  }

  @Mutation(() => Message)
  async deleteMessage(@Args('id') id: string) {
    return this.messageService.delete(id);
  }

  @Query(() => [Message])
  async findLastMessages(@Args('id') id: string) {
    return this.messageService.findLastMessages(id);
  }

  @ResolveField(() => User)
  authorId(@Parent() message: Message) {
    return { __typename: 'User', id: message.authorId };
  }

  @ResolveField(() => User)
  recipientId(@Parent() message: Message) {
    return { __typename: 'User', id: message?.recipientId };
  }
}
