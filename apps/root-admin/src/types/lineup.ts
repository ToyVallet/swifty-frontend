import { type Status } from './festival';

export type LineUpInfoResponse = {
  id: string;
  title: string;
  description: string;
  performanceTime: string;
  lineUpImagePath: string | null;
  lineUpStatus: Status;
};
