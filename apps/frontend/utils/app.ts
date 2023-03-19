import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { io, Socket } from 'socket.io-client';

import { makeVar, ReactiveVar } from '@apollo/client';
import { App, RoleTitle } from '@/graphql/graphql';
import { AppRoutes } from './routes';

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

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');
  cookies.forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
};

const truncateString = (str: string, num: number): string =>
  str.length <= num ? str : `${str.slice(0, num)}...`;

export const getMessageContent = (content: string) => {
  let str = content;
  const head = content.match(/(<h3>(.*?)<\/h3>)/gim);
  const link = content.match(/(<a(.*?)<\/a>)/gim);
  if (Array.isArray(head) && Array.isArray(link)) {
    str = head.shift() + link.shift();
  }
  return truncateString(str, 250);
};

export const getMessageVariant = (role: RoleTitle, content: 'n' | 'm') => {
  const vars = {
    route: '',
    link: content === 'm' ? 'جميع الرسائل' : 'جميع الإشعارات',
  };
  if (role === RoleTitle.Admin) {
    vars.route =
      content === 'm'
        ? AppRoutes.AdminManageMessages
        : AppRoutes.AdminManageNotifications;
  }
  if ([RoleTitle.GoldenTeacher, RoleTitle.Teacher].includes(role)) {
    vars.route =
      content === 'm'
        ? AppRoutes.TeacherMessages
        : AppRoutes.TeacherNotifications;
  }
  if ([RoleTitle.StudentTeacher, RoleTitle.Student].includes(role)) {
    vars.route =
      content === 'm'
        ? AppRoutes.StudentMessages
        : AppRoutes.StudentNotifications;
  }
  return vars;
};

export class Logger {
  static log(error: Error | ValidateErrorEntity<unknown>) {
    //console.log(JSON.stringify(error, null, 2));
    console.error(error);
  }
}
