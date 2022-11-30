import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { PrismaService } from '../app/prisma.service';
import { UsersResolvers } from '../users/user.resolver';

@Module({
  providers: [MessageResolver, UsersResolvers, MessageService, PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
