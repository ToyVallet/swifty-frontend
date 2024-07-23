import type { Status } from '@type';

import type { LineUpInfoResponse } from './lineup';

export type ConcertsResponse = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  lineupInfoResponses: LineUpInfoResponse[];
  concertStatus: Status;
};
