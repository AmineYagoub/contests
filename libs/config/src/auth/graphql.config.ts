import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

import { isProd } from '../';

export const AUTH_GQL_REGISTER_KEY = 'authGQLConfig';

export const authGQLConfig = registerAs(AUTH_GQL_REGISTER_KEY, () => ({
  autoSchemaFile: true,
  graphiql: !isProd,
  federationMetadata: true,
  debug: false,
  context: ({ req, res }) => ({ req, res }),
}));

export type AuthConfigGQLType = ConfigType<typeof authGQLConfig>;
export const InjectAuthGQLConfig = () => Inject(authGQLConfig.KEY);
