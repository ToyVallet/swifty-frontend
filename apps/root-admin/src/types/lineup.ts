export type LineUpStatus =
  | 'OPENED'
  | 'HIDDEN';

export type LineUpInfoResponse = {
  subId: string;
  title: string;
  description: string;
  performanceTime: string;
  lineUpImagePath: string;
  lineUpStatus: LineUpStatus;
};
