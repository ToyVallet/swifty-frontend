import type { Festival_status } from '@lib/types/festival';

export const protectedRoutes = ['/admin'];
export const privateRoutes = ['/mypage', '/ticketing'];

export const API_ROUTES = {
  user: {
    login: '/login',
  },
};

export const API_FESTIVALS = {
  festivals: (
    count: number = 10,
    status: Festival_status = 'all',
    imageType: 'all' | 'thumbnail' | 'poster' = 'all',
    sort: 'updated' | 'recently' | 'popular' = 'updated',
  ) =>
    `/festival?count=${count}&status=${status}&imageType=${imageType}&sort=${sort}`,
  festival: (id: string) => `/festival/${id}`,
  lineUp: (id: string) => `/festival/detail/${id}`,
};

export const API_SIGNUP = {
  user: '/user',
};
