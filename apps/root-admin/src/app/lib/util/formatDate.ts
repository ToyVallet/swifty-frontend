export default function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const formattedMonth = month >= 10 ? month.toString() : '0' + month;
  const formattedDay = day >= 10 ? day.toString() : '0' + day;
  const formattedHour = hour >= 10 ? hour.toString() : '0' + hour;
  const formattedMinute = minute >= 10 ? minute.toString() : '0' + minute;
  const formattedSecond = second >= 10 ? second.toString() : '0' + second;

  return `${date.getFullYear()}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
}

