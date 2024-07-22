const user = {
  login: '/user/login',
  signup: '/user',
  withdraw: '/user',
  checkUniqueId: '/user/check/id',
  checkNameMatches: '/user/check/name',
  findId: '/user/id',
  findPassword: '/user/pwd',
  checkDuplicateId: '/user/check/same/id',
  checkPasswordMatches: '/user/check/pwd',
  changePassword: '/user/change/pwd',
  info: '/user',
  changePhone: '/user/phone',
} as const;

const certification = {
  searchUniversity: '/certification/university',
  certificate: '/certification',
} as const;

const festival = {
  getFestivals: '/festival',
  getFestival: '/festival/[id]',
  getDetailedFestival: '/festival/detail/[id]',
} as const;

const search = {
  autoComplete: '/festival/auto-complete',
  search: '/search',
} as const;

const sms = {
  send: '/sms/code',
  check: '/sms/code/check',
} as const;

const ticketing = {
  cancelTicket: '/ticketing',
  getTicketById: '/ticketing/[id]',
  applyTicket: '/ticketing',
  getAppliableAreas: '/ticketing/area/[id]',
  getAppliableDates: '/ticketing/schedule/[id]',
  checkIfSomeTicketsAppliable: '/ticketing/schedule/[id]/check',
} as const;

export const userApi = {
  ...user,
  ...certification,
  ...festival,
  ...search,
  ...sms,
  ...ticketing,
} as const;

export type UserApi = typeof userApi;
export type UserApiKeys = keyof UserApi;
