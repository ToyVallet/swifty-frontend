import { SERVER_EXTERNAL_URL, SERVER_URL } from '../constants';
import APIError from '../error';
import { isServer } from './device';
import getServerSideCookies from './server/get-serverside-cookies';

export async function customFetch<Res>(
  url: string,
  options: RequestInit = {},
): Promise<Res> {
  console.log('요청: ', url, options);

  const root = isServer() ? SERVER_URL : SERVER_EXTERNAL_URL;
  options = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  if (options.credentials === 'include' && isServer()) {
    options.headers = {
      ...options.headers,
      Cookie: await getServerSideCookies(),
    };
  }

  try {
    const response = await fetch(`${root}${url}`, {
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const data: Res = await response.json();

    return data;
  } catch (e) {
    if (APIError.isAPIError(e)) {
      throw new APIError(e);
    }
    if (e instanceof Error) {
      throw e;
    }
    throw new Error('예상치 못한 오류가 발생했습니다.');
  }
}
