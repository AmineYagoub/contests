import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import { isProd } from '..';

export const CONTEST_GQL_REGISTER_KEY = 'contestGQLConfig';

export const contestGQLConfig = registerAs(CONTEST_GQL_REGISTER_KEY, () => ({
  autoSchemaFile: true,
  graphiql: !isProd,
  federationMetadata: true,
  context: ({ req, res }) => ({ req, res }),
}));

export type ContestConfigGQLType = ConfigType<typeof contestGQLConfig>;
export const InjectContestGQLConfig = () => Inject(contestGQLConfig.KEY);
