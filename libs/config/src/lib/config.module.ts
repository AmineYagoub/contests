import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { authConfig } from '../auth/app.config';
import { authGQLConfig } from '../auth/graphql.config';
import { contestConfig } from '../contest/app.config';
import { contestGQLConfig } from '../contest/graphql.config';
import { gatewayConfig } from '../gateway/app.config';
import { gatewayGQLConfig } from '../gateway/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        contestConfig,
        contestGQLConfig,
        authConfig,
        authGQLConfig,
        gatewayConfig,
        gatewayGQLConfig,
      ],
    }),
  ],
})
export class AppConfigModule {}
