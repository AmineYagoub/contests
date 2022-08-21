import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const CONTEST_CONFIG_REGISTER_KEY = 'contestConfig';

export const contestConfig = registerAs(CONTEST_CONFIG_REGISTER_KEY, () => ({
  // Host of the auth server
  protocol: process.env.CONTEST_PROTOCOL || 'http',
  host: process.env.CONTEST_HOST || '127.0.0.1',
  port: Number(process.env.CONTEST_PORT) || 3001,
  get url() {
    return `${this.protocol}://${this.host}:${this.port}`;
  },
}));

export type ContestConfigType = ConfigType<typeof contestConfig>;
export const InjectContestConfig = () => Inject(contestConfig.KEY);
