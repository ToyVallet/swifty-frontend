import { getCookie } from '@swifty/shared-lib';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = await getCookie('accessToken');

  if (token) {
    //로그인 페이지에 접근하려는 경우 리다이렉트
    if (url.pathname === '/login') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  } else {
    //쿠키가 없는 경우 (로그인되지 않은 상태)
    if (url.pathname !== '/login') {
      url.pathname = '/login'; //로그인 페이지로 리다이렉트
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
