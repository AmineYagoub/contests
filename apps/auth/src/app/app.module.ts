import {
  AppConfigModule,
  authConfig,
  AuthConfigGQLType,
  AuthConfigType,
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
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';

import { AuthModule } from '../authentication/auth.module';
import { RoleModule } from '../authorizations/role.module';
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
    RedisModule.forRootAsync({
      inject: [authConfig.KEY],
      useFactory: async (
        config: AuthConfigType
      ): Promise<RedisModuleOptions> => {
        return {
          config: [
            {
              host: config.redis.host,
              port: config.redis.port,
              password: config.redis.password,
            },
            {
              namespace: 'publisher',
              host: config.redis.host,
              port: config.redis.port,
              password: config.redis.password,
            },
          ],
        };
      },
    }),
    AuthModule,
    UserModule,
    RoleModule,
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
