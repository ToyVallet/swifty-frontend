export type LineUpStatus =
  | 'OPENED'
  | 'HIDDEN';

export type LineUpInfoResponse = {
  subId: string;
  title: string;
  description: string;
  performanceDate: string;
  lineUpImagePath: string;
  lineUpStatus: LineUpStatus;
};
