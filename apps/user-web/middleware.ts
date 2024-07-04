import { COOKIE_KEYS } from '@swifty/shared-lib';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_KEYS.accessToken);

  if (token) {
    try {
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.headers.set('user', JSON.stringify(null));
    } catch (err) {
      console.error('JWT verification failed:', err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};
