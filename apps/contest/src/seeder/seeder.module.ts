import { Module } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { SeederResolver } from './seeder.resolver';
import { SeederService } from './seeder.service';

@Module({
  providers: [PrismaService, SeederService, SeederResolver],
  exports: [SeederService],
})
export class SeederModule {}
