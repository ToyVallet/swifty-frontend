import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';

import { Locale } from '../../types';

const format = {
  ko: {
    year: 'YYYY년 MM월 DD일',
    month: 'MM월 DD일',
    day: 'DD일',
  },
  en: {
    year: 'MMMM DD, YYYY',
    month: 'MMMM DD',
    day: 'DD',
  },
};

export default function formatDate(
  startDate: string,
  endDate: string,
  locale: Locale,
) {
  dayjs.locale(locale);
  const start_date = dayjs(startDate);
  const end_date = dayjs(endDate);

  if (start_date.year() === end_date.year()) {
    if (start_date.month() === end_date.month()) {
      return `${start_date.format(format[locale].year)} - ${end_date.format(format[locale].day)}`;
    } else {
      return `${start_date.format(format[locale].year)} - ${end_date.format(format[locale].month)}`;
    }
  }
  return `${start_date.format(format[locale].year)} - ${end_date.format(format[locale].year)}`;
}
