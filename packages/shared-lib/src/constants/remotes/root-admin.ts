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

export const rootApi = [...user, ...host, ...university] as const;
