import { UserRole } from '@app/types/user';

export const API_LINEUP = {
  lineup: (id?: string) => `/admin/line_up/${id}`
} as const;

export const API_CLIENT = {
  hosts: (userRole?: UserRole, page: number = 0, size: number = 20) =>
    userRole
      ? `/admin/host?userRole=${userRole}&page=${page}&size=${size}`
      : `/admin/host?page=${page}&size=${size}`,
  host: (id: string) => `/admin/host/${id}`,
} as const;

export const API_FESTIVAL = {
  festival: (id?: string) => (id ? `/root/admin/festival/${id}` : '/root/admin/festival'),
  detail: (id: string) => `/host/admin/festival/${id}/detail`,
} as const;

export const API_CONCERT = {
  concert: (id?: string) => `/host/admin/concert/${id}`,
} as const;

export const API_SEARCH = {
  search: (q?: string) =>
    q ? `/festival/search?keyword=${q}` : `festival/search`,
} as const;

export const API_AUTH = {
  login: '/user/login',
} as const;
