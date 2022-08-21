import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { contestGQLConfig } from '../contest/graphql.config';
import { contestConfig } from '../contest/app.config';
import { gatewayConfig } from '../gateway/app.config';
import { gatewayGQLConfig } from '../gateway/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [contestConfig, contestGQLConfig, gatewayConfig, gatewayGQLConfig],
    }),
  ],
})
export class AppConfigModule {}
