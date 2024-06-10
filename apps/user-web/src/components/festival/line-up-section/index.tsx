'use client';

import { type LineUp } from '@swifty/shared-lib';
import dayjs, { type Dayjs } from 'dayjs';
import { useState } from 'react';

import DateSelector from './date-selector';
import LineUpCard from './line-up-card';

type LineUpSectionProps = {
  lineups: LineUp[];
};

export default function LineUpSection({ lineups }: LineUpSectionProps) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(
    dayjs(lineups[0]?.date),
  );
  const lineupDates = Array.from(
    new Set(lineups.map(({ date }) => dayjs(date).format('YYYY-MM-DD'))),
  );

  return (
    <section id="line-up" className="flex flex-col gap-5">
      <h1 className="w-full text-center text-xl font-bold">라인업</h1>
      <DateSelector
        selectedDate={currentDate}
        availableDays={lineupDates.map(dayjs)}
        onSelectDate={setCurrentDate}
      />
      <div className="flex flex-col gap-5">
        {lineups
          .filter(({ date }) => dayjs(date).isSame(currentDate, 'day'))
          .map((lineup) => (
            <LineUpCard key={lineup.id} lineup={lineup} />
          ))}
      </div>
    </section>
  );
}
