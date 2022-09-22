import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { TokenService } from './activationToken.service';

@Module({
  imports: [],
  providers: [TokenService, PrismaService],
})
export class ActivationTokenModule {}
