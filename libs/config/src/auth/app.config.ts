import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

import { isProd } from '../';

import path = require('path');
export const AUTH_CONFIG_REGISTER_KEY = 'authConfig';

export const authConfig = registerAs(AUTH_CONFIG_REGISTER_KEY, () => ({
  // Host of the auth server
  protocol: process.env.AUTH_PROTOCOL || 'http',
  host: process.env.AUTH_HOST || '127.0.0.1',
  port: Number(process.env.AUTH_PORT) || 3003,
  get url() {
    return `${this.protocol}://${this.host}:${this.port}`;
  },
  google: {
    id: process.env.GOOGLE_ID,
    secret: process.env.GOOGLE_SECRET,
  },
  jwt: {
    key: process.env.JWT_SECRET || 'secret',
    expiresIn: '7d',
    aud: 'Olympiad Web App',
    iss: 'Olympiad Web App',
    refreshIn: '7d',
    nonceName: isProd ? '__Host-Fgp-nonce' : 'fgp-nonce',
    nonceExpiresIn: 24 * 60 * 60,
    nonceEncryptAlg: 'aes-192-cbc',
    nonceEncryptKey: process.env.JWT_SECRET || 'secret',
  },
  mail: {
    smtp: process.env.SMTP_SERVICE || 'gmail',
    user: process.env.SMTP_USER || 'yagoub.2.amine@gmail.com',
    pass: process.env.SMTP_PASSWORD || 'nobqrzcgufazldcy',
    redirectUrl: process.env.REDIRECT_URL || 'http://localhost:3000/auth/',
    templatePath: path.join(
      path.resolve(),
      isProd ? './assets/' : './apps/auth/src/assets/'
    ),
    from: process.env.MAIL_FROM || 'yagoub.2.amine@gmail.com',
    subject: process.env.MAIL_SUBJECT || 'فريق عمل موقع تاجرة',
  },
}));

export type AuthConfigType = ConfigType<typeof authConfig>;
export const InjectAuthConfig = () => Inject(authConfig.KEY);
