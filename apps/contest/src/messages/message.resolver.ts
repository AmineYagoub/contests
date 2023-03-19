import {
  CreateMessageDto,
  MessagePaginationDto,
  SendMessageDto,
  UpdateMessageDto,
} from '@contests/dto';
import { BatchPayloadResult } from '@contests/types';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { MessagePaginationResponse } from '../common/pagination.response';
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

  @Mutation(() => Message, { nullable: true })
  async sendNotifications(@Args('input') data: SendMessageDto) {
    return this.messageService.sendNotifications(data);
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

  @Query(() => [Message])
  async findLastNotifications(@Args('id', { nullable: true }) id?: string) {
    return this.messageService.findLastNotifications(id);
  }

  @Query(() => MessagePaginationResponse, { nullable: true })
  async paginateMessages(@Args('params') params: MessagePaginationDto) {
    return this.messageService.paginateMessages(params);
  }

  @Query(() => MessagePaginationResponse, { nullable: true })
  async paginateNotifications(@Args('params') params: MessagePaginationDto) {
    return this.messageService.paginateNotifications(params);
  }

  @Query(() => Int)
  async countAllNotificationsForAdmin() {
    return await this.messageService.countUnreadMessages(false);
  }

  @ResolveField(() => User)
  authorId(@Parent() message: Message) {
    return { __typename: 'User', id: message.authorId };
  }

  @ResolveField(() => User)
  recipientId(@Parent() message: Message) {
    return { __typename: 'User', id: message.recipientId };
  }
}
