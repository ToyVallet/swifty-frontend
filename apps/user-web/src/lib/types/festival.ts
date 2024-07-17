import type { LineUp } from '@lib/types/line-up';

export type Festival_status = 'all' | 'available' | 'active' | 'end' | 'before';

export type Festival = {
  id: string;
  name: string;
  addr: string;
  startDate: string;
  endDate: string;
  description: string;
  festivalImage: string;
};

export type Concert = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  status: 'HIDDEN' | 'OPEN';
  description: string;
  lineUpInfoResponses: LineUp[];
};
