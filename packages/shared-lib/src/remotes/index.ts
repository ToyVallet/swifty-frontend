import { host } from './host';
import { user } from './user';

export type Preset = Record<string, RequestInit>;

export type PresetKeys<T extends Preset> = keyof T;

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';

export type Controller = Record<Method, Preset>;

export const remotes = {
  GET: {
    ...host.GET,
    ...user.GET,
  },
  POST: {
    ...user.POST,
  },
  DELETE: {
    ...user.DELETE,
  },
} as const;
