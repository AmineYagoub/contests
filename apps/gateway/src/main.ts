import { gatewayConfig, GatewayConfigType } from '@contests/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<GatewayConfigType>(gatewayConfig.KEY);
  await app.listen(config.port, '0.0.0.0');
  Logger.log(`🚀 Gateway API is running on: ${config.url}`);
}

bootstrap();
