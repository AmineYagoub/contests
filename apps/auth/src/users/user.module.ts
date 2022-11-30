import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { SeedService } from '../app/seed.service';
import { PasswordService } from '../authentication/password.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    PasswordService,
    SeedService,
  ],
  exports: [UserService],
})
export class UserModule {}
