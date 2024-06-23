import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const FORMAT = 'YYYY-MM-DDTHH:mm:ss';

export default function changeDateFormat(
  date: string | number | Date | dayjs.Dayjs | undefined,
) {
  return dayjs(date).format(FORMAT);
}
