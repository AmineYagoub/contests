import {
  AppConfigModule,
  contestConfig,
  ContestConfigGQLType,
  ContestConfigType,
  contestGQLConfig,
} from '@contests/config';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AnswerModule } from '../answers/answer.module';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';

import { ContestModule } from '../contests/contest.module';
import { MessageModule } from '../messages/message.module';
import { QuestionModule } from '../questions/question.module';
import { TagModule } from '../tags/tag.module';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    AppConfigModule,
    EventEmitterModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: async (config: ContestConfigGQLType) => config,
      inject: [contestGQLConfig.KEY],
    }),
    RedisModule.forRootAsync({
      inject: [contestConfig.KEY],
      useFactory: async (
        config: ContestConfigType
      ): Promise<RedisModuleOptions> => {
        return {
          config: {
            host: config.redis.host,
            port: config.redis.port,
            password: config.redis.password,
          },
        };
      },
    }),
    TagModule,
    AnswerModule,
    ContestModule,
    QuestionModule,
    MessageModule,
  ],
  providers: [AppResolver, AppService, PrismaService],
})
export class AppModule {}
