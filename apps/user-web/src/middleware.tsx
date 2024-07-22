'use server';

import { getCookie } from '@swifty/shared-lib';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = await getCookie('accessToken');

  const pathRequiredLogin = [
    'verification',
    'mypage',
    'ticketing',
    'change-password',
    'change-phone-number',
  ] as const;

  if (token) {
    // 로그인 했을 경우 접근해서는 안되는 페이지
    // login, signup,
    if (url.pathname === '/login' || url.pathname === '/signup') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  } else {
    // 로그인 하지 않았을 경우 접근해서는 안되는 페이지
    // 학적 인증 univ-certification, 마이페이지 mypage, 티켓팅 festival/[id]/ticketing, change-password, change-phone-number
    for (let i = 0; i < pathRequiredLogin.length; i += 1) {
      const value = pathRequiredLogin[i] as (typeof pathRequiredLogin)[number];
      if (url.pathname.includes(value)) {
        url.pathname = '/login'; //로그인 페이지로 리다이렉트
        return NextResponse.redirect(url);
      }
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
