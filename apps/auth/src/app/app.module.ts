import {
  AppConfigModule,
  AuthConfigGQLType,
  authGQLConfig,
} from '@contests/config';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MercuriusFederationDriver,
  MercuriusFederationDriverConfig,
} from '@nestjs/mercurius';

import { AuthModule } from '../authentication/auth.module';
import { ActivationTokenModule } from '../email/activationToken.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    AppConfigModule,
    EventEmitterModule.forRoot(),
    GraphQLModule.forRootAsync<MercuriusFederationDriverConfig>({
      driver: MercuriusFederationDriver,
      useFactory: async (config: AuthConfigGQLType) => config,
      inject: [authGQLConfig.KEY],
    }),
    AuthModule,
    UserModule,
    ActivationTokenModule,
  ],
})
export class AppModule {}
