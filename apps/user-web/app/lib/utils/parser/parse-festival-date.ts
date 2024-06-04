import { FestivalDate } from '@/app/lib/mock/type';

export default function parseFestivalDate(date: FestivalDate): number {
  switch (date) {
    case 'FIRST_DAY':
      return 1;
    case 'SECOND_DAY':
      return 2;
    case 'THIRD_DAY':
      return 3;
    case 'FOURTH_DAY':
      return 4;
    default:
      throw new Error('Invalid date');
  }
}
