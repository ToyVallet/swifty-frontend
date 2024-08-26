const festival = [
  '/host/admin/festival',
  '/host/admin/festival/{id}',
  '/host/admin/festival/{id}/detail',
  '/host/admin/festival/{id}/hidden',
  '/host/admin/festival/{id}/open',
  '/host/admin/festival/{id}/university',
] as const;

const concert = [
  '/host/admin/concert',
  '/host/admin/concert/{id}',
  '/host/admin/concert/{id}/hidden',
  '/host/admin/concert/{id}/open',
] as const;

const lineup = [
  '/host/admin/lineup',
  '/host/admin/lineup/{id}',
  '/host/admin/lineup/{id}/hidden',
  '/host/admin/lineup/{id}/open',
] as const;

const university = ['/host/admin/university/{id}'] as const;

const ticket = [
  '/host/admin/entrance/dynamic/send-sms/{id}',
  '/host/admin/entrance/dynamic/check-sms',
  '/host/admin/entrance/facepass',
] as const;

const user = ['/host/admin/user'] as const;

const certification = [
  '/host/admin/certification/answer',
  '/host/admin/certification/answer/{id}',
  '/host/admin/certification/answer/{id}/approval',
  '/host/admin/certification/answer/{id}/reject',
] as const;

export const hostApi = [
  ...festival,
  ...concert,
  ...lineup,
  ...university,
  ...ticket,
  ...user,
  ...certification,
] as const;
