'use server';

import { cookies } from 'next/headers';

export default async function getServerSideCookies(): Promise<string> {
  const allCookies = cookies().getAll();
  const stringified = Object.entries(allCookies).reduce(
    (acc, [, { name, value }]) => {
      const cookie = `${name}=${value};`;
      return acc + cookie;
    },
    '',
  );
  return stringified;
}
