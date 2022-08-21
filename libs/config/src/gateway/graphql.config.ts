import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';

import { IntrospectAndCompose } from '@apollo/gateway';
import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

import { isProd } from '../';

export const GATEWAY_GQL_REGISTER_KEY = 'gatewayGQLConfig';

export const gatewayGQLConfig = registerAs(GATEWAY_GQL_REGISTER_KEY, () => ({
  server: {
    // ... Apollo server options
    cors: true,
    context: ({ req, res }) => ({ req, res }),
    path: '/',
    debug: !isProd,
    playground: !isProd,
    introspection: !isProd,
    csrfPrevention: isProd,
    plugins: [ApolloServerPluginInlineTraceDisabled()],
  },
  gateway: {
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: 'CONTEST_SERVICE',
          url:
            process.env.GATEWAY_CONTEST_SERVICE_HOST ||
            'http://localhost:3001/graphql',
        },
      ],
    }),
    serviceHealthCheck: true,
    pollIntervalInMs: 5000,
  },
}));

export type GatewayConfigGQLType = ConfigType<typeof gatewayGQLConfig>;
export const InjectGatewayGQLConfig = () => Inject(gatewayGQLConfig.KEY);
