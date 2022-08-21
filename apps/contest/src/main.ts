import { contestConfig, ContestConfigType } from '@contests/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const config = app.get<ContestConfigType>(contestConfig.KEY);
  await app.listen(config.port, '0.0.0.0');
  Logger.log(`🚀 Contest Application is running on: ${config.url}/graphiql`);
}

bootstrap();
