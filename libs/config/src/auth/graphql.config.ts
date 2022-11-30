import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import { isProd } from '../';

export const AUTH_GQL_REGISTER_KEY = 'authGQLConfig';

export const authGQLConfig = registerAs(AUTH_GQL_REGISTER_KEY, () => ({
  autoSchemaFile: true,
  cors: false,
  graphiql: !isProd,
  federationMetadata: true,
  debug: !isProd,
  plugins: [ApolloServerPluginInlineTraceDisabled()],
  context: ({ req, res }) => ({ req, res }),
}));

export type AuthConfigGQLType = ConfigType<typeof authGQLConfig>;
export const InjectAuthGQLConfig = () => Inject(authGQLConfig.KEY);
