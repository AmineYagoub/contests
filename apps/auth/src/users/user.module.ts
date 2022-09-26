import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { PasswordService } from '../authentication/password.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, PrismaService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
