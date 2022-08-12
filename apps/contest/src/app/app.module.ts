import {
  AppConfigModule,
  ContestConfigGQLType,
  contestGQLConfig,
} from '@contests/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MercuriusFederationDriver,
  MercuriusFederationDriverConfig,
} from '@nestjs/mercurius';
import { ContestModule } from '../contests/contest.module';
import { SeederModule } from '../seeder/seeder.module';

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRootAsync<MercuriusFederationDriverConfig>({
      driver: MercuriusFederationDriver,
      useFactory: async (config: ContestConfigGQLType) => config,
      inject: [contestGQLConfig.KEY],
    }),
    ContestModule,
    SeederModule,
  ],
})
export class AppModule {}
