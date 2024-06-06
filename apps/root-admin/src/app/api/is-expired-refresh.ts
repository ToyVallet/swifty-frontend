'use server';

import { COOKIE_KEYS } from '@swifty/shared-lib';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

export const isExpiredRefreshToken = (response: Response) => {
  if (response.status === 401) {
    cookies().delete(COOKIE_KEYS.accessToken);
    cookies().delete(COOKIE_KEYS.refreshToken);

    redirect('/login', RedirectType['replace']);
  }
};
