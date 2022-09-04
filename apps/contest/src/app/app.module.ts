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
import { AnswerModule } from '../answers/answer.module';

import { ContestModule } from '../contests/contest.module';
import { QuestionModule } from '../questions/question.module';
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
    AnswerModule,
    ContestModule,
    QuestionModule,
  ],
})
export class AppModule {}
