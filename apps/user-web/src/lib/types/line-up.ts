export type LineUp = {
  subId: string;
  title: string;
  description: string;
  lineUpImagePath: string;
  performanceTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
};
