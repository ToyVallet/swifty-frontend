'use client';

import { type TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import { FormField, Select, SelectOption } from '@swifty/ui';

type DateSelectProps = {
  options: TicketingDate[];
};

export default function DateSelect({ options }: DateSelectProps) {
  if (options.length === 0) {
    throw new Error('선택 가능한 날짜가 없습니다.');
  }

  return (
    <FormField
      name="date"
      render={({ field }) => (
        <Select
          options={options.map((option) => ({
            label: option.name,
            value: option.ticketingId,
          }))}
          label="날짜 선택"
          defaultValue={options[0]?.ticketingId}
          onValueChange={field.onChange}
        >
          {options.map((option) => (
            <SelectOption value={option.ticketingId} key={option.ticketingId}>
              {/* <div className="flex flex-col gap-x-10">
                <span className="text-22 font-semibold">{option.name}</span>
                <span className="text-16 font-medium">
                  {new Date(option.ticketingStartDateTime).toLocaleDateString()}
                </span>
              </div> */}
              {option.name}
            </SelectOption>
          ))}
        </Select>
      )}
    />
  );
}
