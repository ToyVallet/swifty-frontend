import type { UserRole } from '@app/types/user';

export const API_LINEUP = {
  lineup: (id?: string) => (id ? `/host/admin/line_up/${id}` : '/host/admin/line_up'),
} as const;

export const API_CLIENT = {
  users: (userRole?: UserRole, page: number = 0, size: number = 20) =>
    userRole
      ? `/root/admin/user?userRole=${userRole}&page=${page}&size=${size}`
      : `/root/admin/user?page=${page}&size=${size}`,
  user: (id: string) => `/root/admin/user/${id}`,
  active: (id: string) => `/root/admin/user/${id}/activation`,
  ban: (id: string) => `/root/admin/user/${id}/ban`,
  pause: (id: string) => `/root/admin/user/${id}/pause`,
} as const;

export const API_FESTIVAL = {
  festival: (id?: string) => (id ? `/root/admin/festival/${id}` : '/root/admin/festival'),
  detail: (id: string) => `/host/admin/festival/${id}/detail`,
} as const;

export const API_CONCERT = {
  concert: (id?: string) => (id ? `/host/admin/concert/${id}` : '/host/admin/concert'),
} as const;

export const API_SEARCH = {
  search: (q?: string) =>
    q ? `/festival/search?keyword=${q}` : `festival/search`,
} as const;

export const API_AUTH = {
  login: '/user/login',
} as const;
