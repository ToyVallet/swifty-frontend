import type { Festival_status } from '@lib/types/festival';

export const protectedRoutes = ['/admin'];
export const privateRoutes = ['/mypage', '/ticketing'];

export const API_ROUTES = {
  user: {
    login: '/user/login',
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

export const API_USER = {
  signup: '/user',
  checkId: '/user/id',
  checkDuplicateId: '/user/check/same/id',
  delete: '/user',
  checkPassword: '/user/check/pwd',
  info: '/user',
  changePhone: '/user/phone',
  changePassword: '/user/change/pwd',
};

export const API_CERTIFICATION = {
  search: (keyword: string, page: number = 0, size: number = 5) =>
    `/certification/university?keyword=${keyword}&page=${page}&size=${size}`,
  certification: '/certification',
};

export const API_SMS = {
  sms: '/sms/code',
  smsCheck: '/sms/code/check',
  mockSms: '/sms/code/mock',
  mockSmsCheck: '/sms/code/mock/check',
};
