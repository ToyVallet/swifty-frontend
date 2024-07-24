import { type Status } from './festival';

export type LineUpInfoResponse = {
  id: string;
  title: string;
  description: string;
  performanceTime: string;
  lineupImagePath: string | null;
  lineupStatus: Status;
};
