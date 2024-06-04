'use server';

import { COOKIE_KEYS } from '@constant';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

export const isExpiredRefresh = (response: Response) => {
  if (response.status === 401) {
    // refrech token 만료시 login으로 redirect
    cookies().delete(COOKIE_KEYS.accessToken);
    cookies().delete(COOKIE_KEYS.refreshToken);
    redirect('/login', RedirectType['replace']);
  }
};
