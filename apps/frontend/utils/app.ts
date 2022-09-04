import { io, Socket } from 'socket.io-client';
import { makeVar, ReactiveVar } from '@apollo/client';
import { production } from '@/config/index';

const url = production
  ? process.env.NEXT_PUBLIC_PROD_WS_ENDPOINT
  : process.env.NEXT_PUBLIC_DEV_WS_ENDPOINT;

export const socket = io(url, {
  autoConnect: false,
  closeOnBeforeunload: true,
});

export const socketVar: ReactiveVar<Socket> = makeVar(socket);

export const getTitleMeta = (siteTitle: string, pageTitle?: string) =>
  pageTitle ? `${siteTitle} | ${pageTitle}` : `${siteTitle}`;
