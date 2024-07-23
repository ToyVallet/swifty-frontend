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

const formatOptions = ({
  body,
  options,
}: {
  body?: Record<string, unknown> | FormData;
  options: Omit<RequestOptions, 'method' | 'body'>;
}): RequestOptions => {
  if (body instanceof FormData) {
    return {
      ...options,
      cache: 'no-store',
      headers: {},
      body,
    };
  }
  return {
    ...options,
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
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
  options: Omit<RequestOptions, 'method' | 'body'> = defaultOptions,
) => {
  return request<Res>(url, { method: 'GET', ...options });
};

const post = async <Res = undefined>(
  url: RemoteKeys,
  body?: Record<string, unknown> | FormData,
  options: Omit<RequestOptions, 'method' | 'body'> = defaultOptions,
) => {
  return request<Res>(url, {
    method: 'POST',
    ...formatOptions({ body, options }),
  });
};

const patch = async <Res = undefined>(
  url: RemoteKeys,
  body?: Record<string, unknown> | FormData,
  options: Omit<RequestOptions, 'method'> = defaultOptions,
) => {
  return request<Res>(url, {
    method: 'PATCH',
    ...formatOptions({ body, options }),
  });
};

const _delete = async <Res = undefined>(
  url: RemoteKeys,
  options: Omit<RequestOptions, 'method'> = defaultOptions,
) => {
  return request<Res>(url, { method: 'DELETE', ...options });
};

const http = {
  get,
  post,
  patch,
  delete: _delete,
};

export default http;
