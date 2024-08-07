'use client';

import { type TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import { Button, DrawerClose, FormField, Select } from '@swifty/ui';
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
        <DrawerClose asChild>
          <div className="flex flex-col ui-divide-y ui-divide-swifty-color-700">
            {options.map((option) => (
              <Button
                key={option.id}
                data-value={option.id}
                className="flex justify-center items-end rounded-none gap-[60px] py-4 hover:dark:ui-bg-gray-900 hover:ui-bg-swifty-color-300 focus:ui-bg-swifty-color-400  w-full"
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
        </DrawerClose>
      );
    },
    [options],
  );

  return (
    <FormField
      name="scheduleId"
      render={({ field, fieldState }) => (
        <Select
          options={options.map((option) => ({
            label: option.name,
            value: option.id,
            ...option,
          }))}
          label="날짜 선택"
          defaultValue={options[0]?.id}
          onValueChange={field.onChange}
          render={renderOptions}
          {...fieldState}
        />
      )}
    />
  );
}
