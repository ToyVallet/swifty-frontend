'use client';

import { type TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import { cn } from '@swifty/shared-lib';
import { Button, FormField, Select } from '@swifty/ui';
import dayjs from 'dayjs';
import { useCallback } from 'react';

type DateSelectProps = {
  options: TicketingDate[];
};

export default function DateSelect({ options }: DateSelectProps) {
  if (options.length === 0) {
    throw new Error('선택 가능한 날짜가 없습니다.');
  }

  const renderOptions = useCallback(
    (options: TicketingDate[]) => {
      return (
        <div className="flex flex-col">
          {options.map((option, index) => (
            <Button
              key={option.ticketingId}
              data-value={option.ticketingId}
              className={cn(
                'flex justify-center items-end rounded-none gap-[60px] py-4 hover:ui-bg-gray-900 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-offset-2 focus:ui-ring-swifty-color-900',
                index !== options.length - 1 &&
                  'border-b-2 border-swifty-color-700',
              )}
              disabled={!option.ticketingAvailable}
            >
              <div>
                <h3 className="text-18 font-semibold">예매일</h3>
                <span className="text-16 font-medium">
                  {dayjs(option.ticketingStartDateTime).format('YYYY.MM.DD')}
                </span>
              </div>
              <div>
                <h3 className="text-26 font-semibold">{option.name}</h3>
                <span className="text-16 font-medium">
                  {dayjs(option.concertDateTime).format('YYYY.MM.DD')}
                </span>
              </div>
            </Button>
          ))}
        </div>
      );
    },
    [options],
  );

  return (
    <FormField
      name="date"
      render={({ field }) => (
        <Select
          options={options.map((option) => ({
            label: option.name,
            value: option.ticketingId,
            ...option,
          }))}
          label="날짜 선택"
          defaultValue={options[0]?.ticketingId}
          onValueChange={field.onChange}
          render={renderOptions}
        />
      )}
    />
  );
}
