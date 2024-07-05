import { Toaster } from '@components/ui/sonner';
import { COOKIE_KEYS } from '@swifty/shared-lib';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { jwtDecode } from 'jwt-decode';
import { CookiesProvider } from 'next-client-cookies/server';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import type { PropsWithChildren } from 'react';

import { type User, UserContextProvider } from './context/user-context';

export default function Providers({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_KEYS.accessToken)?.value;
  let user = null;

  if (token) {
    try {
      user = jwtDecode<User>(token);
    } catch (err) {
      console.error('JWT verification failed:', err);
    }
  }
  return (
    <CookiesProvider>
      <UserContextProvider value={user}>
        <NextTopLoader color="#0262E9" showSpinner={false} shadow={false} />
        <Toaster position="top-center" />
        <SpeedInsights />
        <Analytics />
        {children}
      </UserContextProvider>
    </CookiesProvider>
  );
}
