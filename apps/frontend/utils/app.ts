import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { io, Socket } from 'socket.io-client';

import { config } from '@/config/index';
import { makeVar, ReactiveVar } from '@apollo/client';

const url = config.isProduction
  ? process.env.NEXT_PUBLIC_PROD_WS_ENDPOINT
  : process.env.NEXT_PUBLIC_DEV_WS_ENDPOINT;

export const socket = io(url, {
  autoConnect: false,
  closeOnBeforeunload: true,
});

export const socketVar: ReactiveVar<Socket> = makeVar(socket);

export const getTitleMeta = (siteTitle: string, pageTitle?: string) =>
  pageTitle ? `${siteTitle} | ${pageTitle}` : `${siteTitle}`;

export class Logger {
  static log(error: Error | ValidateErrorEntity<unknown>) {
    console.log(JSON.stringify(error, null, 2));
  }
}
