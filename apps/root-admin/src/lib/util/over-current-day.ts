import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const overCurrentDay = (current: Dayjs) => {
  // 현재 날짜보다 이전 날짜를 비활성화
  return current && current < dayjs().startOf('day');
};

export default overCurrentDay;
