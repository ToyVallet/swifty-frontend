const format: Record<string, Format> = {
  year: 'YYYY년 MM월 DD일' as Format,
  month: 'MM월 DD일' as Format,
  day: 'DD일' as Format,
} as const;

type Format = 'YYYY년 MM월 DD일' | 'MM월 DD일' | 'DD일';

/**
 * @name formatDate
 * @description 날짜를 포맷팅합니다.
 * @param date 포맷팅할 날짜
 * @param format 포맷
 * @returns
 */
export function formatDate(date: Date, format: Format) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  } as const;
  const [year, month, day] = date
    .toLocaleDateString('ko-KR', options)
    .split('.');

  switch (format) {
    case 'YYYY년 MM월 DD일':
      return `${year}년 ${month}월 ${day}일`;
    case 'MM월 DD일':
      return `${month}월 ${day}일`;
    case 'DD일':
      return `${day}일`;
    default:
      return '';
  }
}

/**
 * @name formatDateRange
 * @description 날짜 범위를 포맷팅합니다.
 * @param start 시작 날짜
 * @param end 종료 날짜
 * @returns
 */
export function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate.toDateString() === endDate.toDateString()) {
    return formatDate(startDate, format.year as Format);
  }

  if (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth()
  ) {
    return `${formatDate(startDate, format.month as Format)} - ${formatDate(endDate, format.day as Format)}`;
  }

  if (startDate.getFullYear() === endDate.getFullYear()) {
    return `${formatDate(startDate, format.year as Format)} - ${formatDate(endDate, format.year as Format)}`;
  }

  return `${formatDate(startDate, format.year as Format)} - ${formatDate(endDate, format.year as Format)}`;
}

/**
 * @name formatDateOfBirth
 * @description 생년월일을 포맷팅합니다.
 * @param value  생년월일
 * @returns
 */
export function formatDateOfBirth(value: string) {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,4})(\d{0,2})(\d{0,2})$/);

  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join('-');
  }

  return value;
}

/**
 * @name dauDifference
 * @description 인자로 주어진 날짜와 현재 시간간의 차이를 비교합니다.
 * @param date 비교할 생년월일
 * @returns 해당 공연 시작이 며칠 남았는지 반환합니다. 이미 축제 기간이 지났다면 "마감"으로 표기합니다.
 */
export function dayDifference(date: Date | string) {
  const now = new Date();
  const targetDate = new Date(date);
  const diff = targetDate.getTime() - now.getTime();

  // 밀리초를 일로 변환
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  // 결과 반환
  if (diffDays > 1) {
    return `${diffDays}일 전`;
  } else if (diffDays === 0) {
    return '오늘';
  } else {
    return `마감`;
  }
}
