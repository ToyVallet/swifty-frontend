import { SERVER_EXTERNAL_URL, SERVER_URL } from '../constants';
import { RemoteKeys, remotes } from '../constants/remotes';
import APIError from '../error';
import { isServer } from './device';
import { getAllCookies } from './server';

const defaultOptions: RequestInit = {
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  cache: 'no-cache',
};

async function request<Res>(
  url: string,
  options: RequestInit = defaultOptions,
): Promise<Res> {
  const root = isServer() ? SERVER_URL : SERVER_EXTERNAL_URL;

  if (options.credentials === 'include' && isServer()) {
    options.headers = {
      ...options.headers,
      Cookie: await getAllCookies(),
    };
  }

  try {
    const response = await fetch(`${root}${url}`, options);

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

const get = async <Res extends undefined>(
  urlKey: RemoteKeys,
  options: RequestInit = defaultOptions,
) => {
  return request<Res>(remotes[urlKey], { method: 'GET', ...options });
};

const post = async <Res extends undefined>(
  urlKey: RemoteKeys,
  body: Record<string, unknown>,
  options: RequestInit = defaultOptions,
) => {
  return request<Res>(remotes[urlKey], {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });
};

export const http = {
  get,
  post,
};
