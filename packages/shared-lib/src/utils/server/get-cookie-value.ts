'use server';

import { cookies } from 'next/headers';

export default async function getCookieValue(name: string) {
  const value = cookies().get(name);
  if (value?.value) return value.value;
  return null;
}
