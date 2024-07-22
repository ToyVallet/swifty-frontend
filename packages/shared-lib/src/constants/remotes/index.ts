import { userApi } from './user-api';

type Params = Record<string, string>;
type Query = Record<string, string>;

type BuildUrlParams = {
  params?: Params;
  query?: Query;
};

export const buildUrl = (
  url: string,
  { params = {}, query = {} }: BuildUrlParams,
) => {
  const urlWithParams = Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`[${key}]`, value),
    url,
  );
  const queryString = new URLSearchParams(query).toString();

  return queryString ? `${urlWithParams}?${queryString}` : urlWithParams;
};

export const remotes = {
  ...userApi,
};

export type Remotes = typeof remotes;
export type RemoteKeys = keyof Remotes;
