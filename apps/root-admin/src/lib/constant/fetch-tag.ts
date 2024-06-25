export const FETCH_TAG = {
  university: 'university',
  users: 'users',
  hostUsers: 'university-host-user',
  festivals: 'festivals',
  festivalsDetail: (id: string) => `festival-detail-${id}`,
} as const;
