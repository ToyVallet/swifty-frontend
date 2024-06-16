import type { LineUpInfoResponse } from '@app/types/lineup';

export type ConcertStatus =
  | 'OPENED'
  | 'HIDDEN';

export type ConcertsResponse = {
  subId: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  lineUpInfoResponses: LineUpInfoResponse[];
  concertStatus: ConcertStatus
};