import type { UserRole } from '@type';

export const API_LINEUP = {
  lineup: (id?: string) =>
    id ? `/host/admin/line_up/${id}` : '/host/admin/line_up',
} as const;

export const API_CLIENT = {
  users: (page: number = 0, size: number = 20, role?: UserRole) =>
    role
      ? `/root/admin/user?userRole=${role}&page=${page}&size=${size}`
      : `/root/admin/user?page=${page}&size=${size}`,
  user: (id: string) => `/root/admin/user/${id}`,
  active: (id: string) => `/root/admin/user/${id}/activation`,
  ban: (id: string) => `/root/admin/user/${id}/ban`,
  pause: (id: string) => `/root/admin/user/${id}/pause`,
} as const;

export const API_FESTIVAL = {
  festival: (id?: string) =>
    id ? `/host/admin/festival/${id}` : '/host/admin/festival',
  detail: (id: string) => `/host/admin/festival/detail/${id}`,
} as const;

export const API_SEARCH = {
  search: (q?: string) =>
    q ? `/festival/search?keyword=${q}` : `festival/search`,
} as const;

export const API_AUTH = {
  login: '/user/login',
} as const;

export const API_UNIVERSITY = {
  get_univiresity: (page = 0, size = 20) =>
    `/root/admin/university?page=${page}&size=${size}`,
  post_university: () => '/root/admin/university',
  patch_delete_universiry: (id: string) => `/root/admin/university/${id}`,
  university_logo: (id: string) => `/root/admin/university/${id}/logo`,
  university_detail: (id: string) => `/host/admin/university/${id}`,
};
