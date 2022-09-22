import { ValidationError } from 'class-validator';
import mercurius from 'mercurius';

import { authConfig, AuthConfigType } from '@contests/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';

const { ErrorWithProps } = mercurius;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const config = app.get<AuthConfigType>(authConfig.KEY);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ErrorWithProps('error', validationErrors, 422);
      },
    })
  );
  await app.listen(config.port, '0.0.0.0');
  Logger.log(`🚀 Auth Application is running on: ${config.url}/graphiql`);
}

bootstrap();
