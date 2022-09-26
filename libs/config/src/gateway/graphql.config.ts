import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';

import { IntrospectAndCompose } from '@apollo/gateway';
import { GatewayGraphQLError } from '@contests/types';
import { HttpStatus, Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

import { isProd } from '../';

export const GATEWAY_GQL_REGISTER_KEY = 'gatewayGQLConfig';

const HttpResponsePlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }) {
        // response.http.headers.set('Custom-Header', 'hello');
        if (response?.errors?.[0]?.status) {
          response.http.status = response?.errors?.[0]?.status;
        }
      },
    };
  },
};

export const gatewayGQLConfig = registerAs(GATEWAY_GQL_REGISTER_KEY, () => ({
  server: {
    cors: true,
    context: ({ req, res }) => ({ req, res }),
    path: '/',
    debug: false,
    introspection: !isProd,
    csrfPrevention: true,
    plugins: [HttpResponsePlugin, ApolloServerPluginInlineTraceDisabled()],
    formatError(error: GatewayGraphQLError) {
      if (error.extensions?.response?.body?.errors[0]?.extensions) {
        return {
          message: error.extensions?.response.statusText,
          status: error.extensions.response.status,
          errors: error.extensions.response.body.errors[0].extensions,
        };
      }
      /* if (
        error.extensions?.response?.body?.errors[0]?.message.includes(
          "findUniqueOrThrow()"
        )
      ) {
        return {
          message: "Not Found",
          status: HttpStatus.NOT_FOUND,
        };
      } */
      return error;
    },
  },
  gateway: {
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: 'AUTH_SERVICE',
          url:
            process.env.GATEWAY_AUTH_SERVICE_HOST ||
            'http://localhost:3003/graphql',
        },
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
