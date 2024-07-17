'use client';

import { type TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import { FormField, Select } from '@swifty/ui';

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
        />
      )}
    />
  );
}
