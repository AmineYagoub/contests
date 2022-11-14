import {
  AppConfigModule,
  ContestConfigGQLType,
  contestGQLConfig,
} from '@contests/config';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AnswerModule } from '../answers/answer.module';

import { ContestModule } from '../contests/contest.module';
import { QuestionModule } from '../questions/question.module';
import { TagModule } from '../tags/tag.module';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: async (config: ContestConfigGQLType) => config,
      inject: [contestGQLConfig.KEY],
    }),

    TagModule,
    AnswerModule,
    ContestModule,
    QuestionModule,
  ],
  providers: [AppResolver, AppService, PrismaService],
})
export class AppModule {}
