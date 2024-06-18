import type { LineUpInfoResponse } from './lineup';

export type ConcertStatus = 'OPENED' | 'HIDDEN';

export type ConcertsResponse = {
  subId: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  lineUpInfoResponses: LineUpInfoResponse[];
  concertStatus: ConcertStatus;
};
