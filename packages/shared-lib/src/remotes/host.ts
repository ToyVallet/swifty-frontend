import type { Controller } from '.';

const GET = {
  '/host/admin/line_up/[id]': {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  },
} as const;

export const host = { GET };
