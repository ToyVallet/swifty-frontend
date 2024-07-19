'use server';

import { cookies } from 'next/headers';

export default async function deleteCookie(key: string) {
  try {
    cookies().set(key, '', {
      expires: new Date(0),
      domain: '.swifty.kr',
      path: '/',
      secure: true,
    });
    return true;
  } catch (err) {
    return false;
  }
}
