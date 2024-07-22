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
  '/host/admin/line_up',
  '/host/admin/line_up/{id}',
  '/host/admin/line_up/{id}/hidden',
  '/host/admin/line_up/{id}/open',
] as const;

export const hostApi = [...festival, ...concert, ...lineup] as const;
