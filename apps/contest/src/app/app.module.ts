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
import { QuestionModule } from '../questions/question.module';
import { SeederModule } from '../seeder/seeder.module';
import { TagModule } from '../tags/tag.module';

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRootAsync<MercuriusFederationDriverConfig>({
      driver: MercuriusFederationDriver,
      useFactory: async (config: ContestConfigGQLType) => config,
      inject: [contestGQLConfig.KEY],
    }),
    TagModule,
    ContestModule,
    QuestionModule,
    SeederModule,
  ],
})
export class AppModule {}
