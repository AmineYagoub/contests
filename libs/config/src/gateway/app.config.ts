import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const GATEWAY_CONFIG_REGISTER_KEY = 'gatewayConfig';

export const gatewayConfig = registerAs(GATEWAY_CONFIG_REGISTER_KEY, () => ({
  protocol: process.env.AUTH_PROTOCOL || 'http',
  host: process.env.AUTH_HOST || '127.0.0.1',
  port: Number(process.env.AUTH_PORT) || 3000,
  get url() {
    return `${this.protocol}://${this.host}:${this.port}`;
  },
}));

export type GatewayConfigType = ConfigType<typeof gatewayConfig>;
export const InjectGatewayConfig = () => Inject(gatewayConfig.KEY);
