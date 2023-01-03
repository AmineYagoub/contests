import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { PrismaService } from '../app/prisma.service';
import { UserResolver } from '../users/user.resolver';
import { MessageEvents } from './message.events';

@Module({
  providers: [
    MessageResolver,
    UserResolver,
    MessageService,
    PrismaService,
    MessageEvents,
  ],
  exports: [MessageService],
})
export class MessageModule {}
