import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';
import { ActivationTokenResolver } from './activationToken.resolver';
import { ActivationTokenService } from './activationToken.service';

@Module({
  imports: [],
  providers: [ActivationTokenService, ActivationTokenResolver, PrismaService],
})
export class ActivationTokenModule {}
