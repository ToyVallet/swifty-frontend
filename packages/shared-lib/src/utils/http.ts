import { PresetKeys, remotes } from '../remotes';

type GetPath = keyof typeof remotes.GET;

const get = async <Res extends unknown>(
  url: PresetKeys<typeof remotes.GET>,
) => {
  return fetch(url, remotes.GET[url]) as Promise<Res>;
};

const post = async <Res extends unknown>(
  url: PresetKeys<typeof remotes.POST>,
  body: Record<string, unknown>,
) => {
  return fetch(url, {
    ...remotes.POST[url],
    body: JSON.stringify(body),
  }) as Promise<Res>;
};

export const http = {
  get,
  post,
};
