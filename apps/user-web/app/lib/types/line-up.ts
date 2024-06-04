export type LineUp = {
  id: number;
  name: string;
  date?: string;
  performance_day: 'FIRST_DAY' | 'SECOND_DAY' | 'THIRD_DAY' | 'FOURTH_DAY';
  festival_id: number;
  image: string;
};
