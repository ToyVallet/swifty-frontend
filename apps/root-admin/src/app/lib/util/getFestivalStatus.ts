function convertToKST(dateStr: string): Date {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + 9);
  return date;
}

export default function getFestivalStatus(
  startDateStr: string,
  endDateStr: string,
): 'BEFORE' | 'PROCESS' | 'CLOSED' {
  const startDate = convertToKST(startDateStr);
  const endDate = convertToKST(endDateStr);
  const now = new Date();
  if (now < startDate) return 'BEFORE';
  if (now >= startDate && now <= endDate) {
    return 'PROCESS';
  }

  return 'CLOSED';
}
