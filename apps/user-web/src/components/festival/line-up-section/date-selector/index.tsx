'use client';

import dayjs, { type Dayjs } from 'dayjs';

import DateBlock from './date-block';

type DateSelectorProps = {
  availableDays: Dayjs[];
  selectedDate: Dayjs;
  onSelectDate: (date: Dayjs) => void;
};

export default function DateSelector({
  availableDays,
  selectedDate,
  onSelectDate,
}: DateSelectorProps) {
  const daysArr = Array.from({ length: 5 }, (_, i) =>
    selectedDate.add(i - 2, 'day'),
  );

  return (
    <div className="w-full h-[70px] flex items-center justify-between relative">
      {daysArr.map((date, index) => (
        <DateBlock
          key={index}
          date={date}
          selected={
            dayjs(selectedDate).format('YYYY-MM-DD') ===
            dayjs(date).format('YYYY-MM-DD')
          }
          disabled={!availableDays.some((day) => day.isSame(date, 'day'))}
          onClick={() => onSelectDate(date)}
        />
      ))}
      <div className="bg-primary rounded-xl h-full w-[20%] absolute left-1/2 -translate-x-1/2" />
    </div>
  );
}
