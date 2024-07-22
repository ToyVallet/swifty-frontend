import { userApi } from './user-api';

type Params = Record<string, string>;
type Query = Record<string, string>;

export type UrlParams = {
  params?: Params;
  query?: Query;
};

export const remotes = [...userApi] as const;

export type RemoteKeys = (typeof remotes)[number];

export const buildUrl = (
  url: string,
  { params = {}, query = {} }: UrlParams,
) => {
  const urlWithParams = Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    url,
  );
  const queryString = new URLSearchParams(query).toString();

  return queryString ? `${urlWithParams}?${queryString}` : urlWithParams;
};
