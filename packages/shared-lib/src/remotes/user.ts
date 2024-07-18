import type { Controller, Preset, PresetKeys } from '.';

const GET = {
  '/user': {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  },
} as const;

const POST = {
  '/user': {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  },
  '/user/login': {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  },
} as const;

const DELETE = {
  '/user': {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  },
} as const;

export const user = { GET, POST, DELETE };
