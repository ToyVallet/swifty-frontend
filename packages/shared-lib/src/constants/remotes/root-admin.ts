const user = [
  '/root/admin/user',
  '/root/admin/user/{id}',
  '/root/admin/user/{id}/activation',
  '/root/admin/user/{id}/ban',
  '/root/admin/user/{id}/pause',
] as const;

const host = ['/root/admin/host', '/root/admin/host/{id}'] as const;

const university = [
  '/root/admin/university',
  '/root/admin/university/{id}',
  '/root/admin/university/{id}/logo',
] as const;

const festival = ['/root/admin/festival'] as const;

const log = ['/log', '/log/{id}'] as const;

export const rootApi = [
  ...log,
  ...user,
  ...host,
  ...university,
  ...festival,
] as const;
