import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import { ValidationError } from 'class-validator';
import { GraphQLError } from 'graphql';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

import { isProd } from '../';

type GatewayGraphQLError = {
  extensions: {
    exception: {
      status: number;
      message: string;
      response: {
        statusCode: number;
        validationErrors: ValidationError[];
        statusText: string;
      };
    };
  };
} & GraphQLError;

export const GATEWAY_GQL_REGISTER_KEY = 'gatewayGQLConfig';

const HttpResponsePlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }) {
        if (response?.errors?.[0]?.status) {
          response.http.status = response?.errors?.[0]?.status;
        }
      },
    };
  },
};

class CookieDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context.req === undefined) {
      request.http.headers.set(
        process.env.GATEWAY_INIT_HEADER_NAME, // x-gateway
        process.env.GATEWAY_INIT_HEADER_VALUE // superSecretGatewaySecret
      );
      return;
    }

    const { headers } = context.req;
    if (headers !== undefined) {
      Object.keys(headers).map(
        (key) => request.http && request.http.headers.set(key, headers[key])
      );
    }
  }
  didReceiveResponse({ response, context }) {
    const cookie = response.http.headers.get('Cookie');
    if (cookie) {
      context.res.setHeader('Set-Cookie', cookie);
    }
    return response;
  }
}

export const gatewayGQLConfig = registerAs(GATEWAY_GQL_REGISTER_KEY, () => ({
  server: {
    cors: {
      // origin: process.env.GATEWAY_CORS_ORIGIN || 'https://olympiadnahw.com',
      origin: process.env.GATEWAY_CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    },
    context: ({ req, res }) => ({ req, res }),
    path: '/',
    debug: false,
    introspection: !isProd,
    csrfPrevention: true,
    plugins: [HttpResponsePlugin, ApolloServerPluginInlineTraceDisabled()],
    formatError(error: any) {
      console.log(JSON.stringify(error, null, 2));
      if (error.extensions?.exception?.cause) {
        return {
          message: error.extensions?.exception.cause.code,
          status: error.extensions.exception.status,
        };
      }
      if (error.extensions?.response?.statusCode === 422) {
        return {
          errors: error.extensions?.response?.error,
          message: error.extensions?.response?.message,
          status: error.extensions?.response?.statusCode,
        };
      }
      if (error.extensions) {
        const messages = (
          error as GatewayGraphQLError
        ).extensions?.exception.response.validationErrors.map(
          (el) => el.constraints
        );

        return {
          errors: messages,
          message: error.message,
          status:
            error.extensions.exception.status ||
            error.extensions.exception.response.status,
        };
      }

      return error;
    },
  },
  gateway: {
    buildService({ name, url }) {
      return new CookieDataSource({ url });
    },
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
