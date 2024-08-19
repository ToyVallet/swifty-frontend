'use server';

import { getCookie } from '@swifty/shared-lib';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = await getCookie('accessToken');

  if (token) {
    if (url.pathname === '/login') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  } else {
    if (
      url.pathname === '/' ||
      url.pathname === '/dynamic' ||
      url.pathname === '/facepass'
    ) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // 서버 컴포넌트 headername
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
