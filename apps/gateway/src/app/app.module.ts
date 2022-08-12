import {
  AppConfigModule,
  GatewayConfigGQLType,
  gatewayGQLConfig,
} from '@contests/config';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: async (config: GatewayConfigGQLType) => config,
      inject: [gatewayGQLConfig.KEY],
    }),
  ],
})
export class AppModule {}
