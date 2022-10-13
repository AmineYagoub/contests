// middleware.ts
import { NextResponse } from 'next/server';

import { config as appConfig } from './config';
import { AppRoutes } from './utils/routes';

import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  /*   const cookie = request.cookies.get(appConfig.nonceName);
  if (!cookie) {
    const url = request.nextUrl.clone();
    url.pathname = AppRoutes.SignIn;
    return NextResponse.redirect(url);
  } */

  return response;
}
export const config = {
  matcher: ['/admin/:path*', '/profile/:path*'],
};
