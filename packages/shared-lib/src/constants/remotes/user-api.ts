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
  '/user/ticket',
] as const;

const certification = [
  '/certification/university',
  '/certification',
  '/certification/check',
] as const;

const festival = [
  '/festival',
  '/festival/{id}',
  '/festival/detail/{id}',
  '/festival/auto-complete',
  '/festival/search',
] as const;

const sms = ['/sms/code', '/sms/code/check'] as const;

const ticketing = [
  '/ticket/{id}',
  '/ticketing',
  '/ticketing/{id}',
  '/ticketing/area/{id}',
  '/ticketing/schedule/{id}',
  '/ticketing/schedule/{id}/check',
] as const;

const recaptcha = ['/recaptcha'] as const;

export const userApi = [
  ...user,
  ...certification,
  ...festival,
  ...sms,
  ...ticketing,
  ...recaptcha,
] as const;

export type UserApiKeys = (typeof userApi)[number];
