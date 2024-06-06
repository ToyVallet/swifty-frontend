import { UserRole } from '@app/types/user';

export const API_LINEUP = {
  lineup: (id?: string) => (id ? `/admin/line_up/${id}` : '/admin/line_up'),
} as const;

export const API_CLIENT = {
  hosts: (userRole?: UserRole, page: number = 0, size: number = 20) =>
    userRole
      ? `/admin/host?userRole=${userRole}&page=${page}&size=${size}`
      : `/admin/host?page=${page}&size=${size}`,
  host: (id: string) => `/admin/host/${id}`,
} as const;

export const API_FESTIVAL = {
  festival: (id?: string) => (id ? `/admin/festival/${id}` : '/admin/festival'),
  detail: (id: string) => `/admin/festival/detail/${id}`,
} as const;

export const API_SEARCH = {
  search: (q?: string) =>
    q ? `/festival/search?keyword=${q}` : `festival/search`,
} as const;

export const API_AUTH = {
  login: '/user/login',
} as const;
