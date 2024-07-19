'use server';

import { cookies } from 'next/headers';

export default async function deleteCookie(key: string) {
  try {
    cookies().delete(key);
    return true;
  } catch (err) {
    return false;
  }
}
