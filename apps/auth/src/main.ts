import { ValidationError } from 'class-validator';

import { authConfig, AuthConfigType } from '@contests/config';
import {
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new UnprocessableEntityException({ validationErrors });
      },
    })
  );
  const config = app.get<AuthConfigType>(authConfig.KEY);
  await app.listen(config.port, '0.0.0.0');
  Logger.log(`🚀 Auth Application is running on: ${config.url}/graphql`);
}

bootstrap();
