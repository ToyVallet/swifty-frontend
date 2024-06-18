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
    id ? `/root/admin/festival/${id}` : '/root/admin/festival',
  detail: (id: string) => `/host/admin/festival/${id}/detail`,
} as const;

export const API_CONCERT = {
  concert: (id?: string) =>
    id ? `/host/admin/concert/${id}` : '/host/admin/concert',
  open: (id: string) => `/host/admin/concert/${id}/open`,
  hidden: (id: string) => `/host/admin/concert/${id}/hidden`,
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
  festivals: (id: string) => `/host/admin/festival/${id}/university`,
};

export const API_HSOT = {
  host: '/root/admin/host',
  host_detail: (id: string) => `/root/admin/host/${id}`,
};
