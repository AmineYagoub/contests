import {
  AppConfigModule,
  AuthConfigGQLType,
  authGQLConfig,
} from '@contests/config';
import { GqlAuthGuard } from '@contests/utils';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from '../authentication/auth.module';
import { ActivationTokenModule } from '../email/activationToken.module';
import { ProfileModule } from '../profile/profile.module';
import { SubscriptionPlanModule } from '../subscriptionPlans/plan.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    AppConfigModule,
    EventEmitterModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: async (config: AuthConfigGQLType) => config,
      inject: [authGQLConfig.KEY],
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    SubscriptionPlanModule,
    ActivationTokenModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
