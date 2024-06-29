import type { LineUp } from '@lib/types/line-up';

export type FestivalImage = {
  file: string;
  originalFileName: string;
  mimeType: string;
  type: string;
};

export type FestivalInfo = {
  id: string;
  name: string;
  addr: string;
  startdate: string;
  enddate: string;
  festivalStatus: 'BEFORE' | 'PENDING' | 'AFTER';
  description: string;
  festivalFiles?: FestivalImage[];
  festivalimage?: string;
  url: string;
};

export type Festival_status = 'all' | 'available' | 'active' | 'end' | 'before';

export type Festival = {
  subId: string;
  name: string;
  addr: string;
  startDate: string;
  endDate: string;
  description: string;
  festivalImage: string;
};

export type Concert = {
  subId: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  status: 'HIDDEN' | 'OPEN';
  description: string;
  lineUpInfoResponses: LineUp[];
};
