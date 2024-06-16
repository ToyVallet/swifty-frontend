'use server';

import { cookies } from 'next/headers';

interface CookieOptions {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  expires?: Date;
}

interface CookieOption {
  name: string;
  value: string;
  option?: CookieOptions;
}

export async function createCookie(data: CookieOption) {
  cookies().set(data.name, data.value, { ...data.option });
}

export async function getCookieValue(name: string) {
  const cookieStore = cookies();
  const value = cookieStore.get(name);
  if (value?.value) {
    return value.value;
  }
  return null;
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}
