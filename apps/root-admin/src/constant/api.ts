export const SERVER_URL = 'https://dpi.swifty.kr' as const;

export const API_LINEUP = {
  lineup: (id?: string) => `/admin/line_up/${id}`
} as const;

export const API_CLIENT = {
  host: (id?: string) => (id ? `/admin/host/${id}` : '/admin/host'),
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
