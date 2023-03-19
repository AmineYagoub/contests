import { Inject } from '@nestjs/common';
import { Federation2Config } from '@nestjs/graphql';
import { ConfigType, registerAs } from '@nestjs/config';
import { isProd } from '..';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';

export const CONTEST_GQL_REGISTER_KEY = 'contestGQLConfig';

export const contestGQLConfig = registerAs(CONTEST_GQL_REGISTER_KEY, () => ({
  autoSchemaFile: {
    federation: {
      version: 2,
    } as Federation2Config,
  },
  graphiql: !isProd,
  federationMetadata: true,
  debug: !isProd,
  plugins: [ApolloServerPluginInlineTraceDisabled()],
  context: ({ req, res }) => ({ req, res }),
}));

export type ContestConfigGQLType = ConfigType<typeof contestGQLConfig>;
export const InjectContestGQLConfig = () => Inject(contestGQLConfig.KEY);
