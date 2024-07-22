const user = [
  '/user/login',
  '/user',
  '/user/check/id',
  '/user/check/name',
  '/user/id',
  '/user/pwd',
  '/user/check/same/id',
  '/user/check/pwd',
  '/user/change/pwd',
  '/user/phone',
] as const;

const certification = ['/certification/university', '/certification'] as const;

const festival = [
  '/festival',
  '/festival/{id}',
  '/festival/detail/{id}',
  '/festival/auto-complete',
  '/festival/search',
] as const;

const sms = ['/sms/code', '/sms/code/check'] as const;

const ticketing = [
  '/ticketing',
  '/ticketing/{id}',
  '/ticketing/area/{id}',
  '/ticketing/schedule/{id}',
  '/ticketing/schedule/{id}/check',
] as const;

export const userApi = [
  ...user,
  ...certification,
  ...festival,
  ...sms,
  ...ticketing,
] as const;

export type UserApiKeys = (typeof userApi)[number];
