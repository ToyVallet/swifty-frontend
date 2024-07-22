import { SERVER_EXTERNAL_URL, SERVER_URL } from '../constants';
import {
  type RemoteKeys,
  type UrlParams,
  buildUrl,
  remotes,
} from '../constants/remotes';
import APIError from '../error';
import { isServer } from './device';
import { getAllCookies } from './server';

type RequestOptions = RequestInit & UrlParams;

const defaultOptions: RequestOptions = {
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  cache: 'no-store',
};

async function request<Res>(
  url: string,
  options: RequestOptions = defaultOptions,
): Promise<Res> {
  const root = isServer() ? SERVER_URL : SERVER_EXTERNAL_URL;

  if (options.credentials === 'include' && isServer()) {
    options.headers = {
      ...options.headers,
      Cookie: await getAllCookies(),
    };
  }

  const requestUrl = `${root}${buildUrl(url, options)}`;

  try {
    const response = await fetch(requestUrl, options);

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

const get = async <Res = undefined>(
  url: RemoteKeys,
  options: Omit<RequestOptions, 'method'> = defaultOptions,
) => {
  return request<Res>(url, { method: 'GET', ...options });
};

const post = async <Res = undefined>(
  url: RemoteKeys,
  body: Record<string, unknown>,
  options: Omit<RequestOptions, 'method'> = defaultOptions,
) => {
  return request<Res>(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });
};

export const http = {
  get,
  post,
};
