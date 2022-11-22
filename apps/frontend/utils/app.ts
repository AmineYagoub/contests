import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { io, Socket } from 'socket.io-client';

import { makeVar, ReactiveVar } from '@apollo/client';
import { App } from '@/graphql/graphql';

export const socket = io(process.env.NEXT_PUBLIC_WS_ENDPOINT, {
  autoConnect: false,
  closeOnBeforeunload: true,
});

export const socketVar: ReactiveVar<Socket> = makeVar(socket);
export const appDataVar: ReactiveVar<App> = makeVar({
  title: 'جاري التحميل',
} as App);

export const getTitleMeta = (siteTitle: string, pageTitle?: string) =>
  pageTitle ? `${siteTitle} | ${pageTitle}` : `${siteTitle}`;

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    price / 100
  );

export class Logger {
  static log(error: Error | ValidateErrorEntity<unknown>) {
    //console.log(JSON.stringify(error, null, 2));
    console.error(error);
  }
}
