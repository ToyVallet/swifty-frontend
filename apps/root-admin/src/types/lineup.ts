import { type Status } from './festival';

export type LineUpInfoResponse = {
  id: string;
  title: string;
  description: string;
  performanceTime: string;
  lineupImage: string | null;
  lineupStatus: Status;
};
