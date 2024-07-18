'use client';

import type { Concert } from '@lib/types/festival';
import dayjs, { type Dayjs } from 'dayjs';
import { useState } from 'react';

import DateSelector from './date-selector';
import LineUpCard from './line-up-card';

type LineUpSectionProps = {
  concerts: Concert[];
};

export default function LineUpSection({ concerts }: LineUpSectionProps) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(
    dayjs(concerts[0]?.startDate),
  );

  const lineupDates = Array.from(
    new Set(
      concerts.map(({ startDate }) => dayjs(startDate).format('YYYY-MM-DD')),
    ),
  );

  return (
    <section id="line-up" className="flex flex-col gap-5 w-full">
      <h1 className="w-full text-center text-20 font-bold text-white">
        라인업
      </h1>
      <DateSelector
        selectedDate={currentDate}
        availableDays={lineupDates.map(dayjs)}
        onSelectDate={setCurrentDate}
      />
      <div className="flex flex-col gap-5">
        {concerts
          .filter(({ startDate }) =>
            dayjs(startDate).isSame(currentDate, 'day'),
          )
          .map((concert) =>
            concert.lineUpInfoResponses.map((lineup) => (
              <LineUpCard key={lineup.id} lineup={lineup} />
            )),
          )}
      </div>
    </section>
  );
}
