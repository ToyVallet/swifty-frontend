'use client';

import type { TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import { Icon } from '@swifty/assets';
import dayjs from 'dayjs';
import type { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  ticketing: TicketingDate[];
};

export default function TicketInfo({ ticketing }: Props) {
  const form = useFormContext();
  const selectedTicketId = form.getValues('scheduleId');
  const selectiedTicketInfo = ticketing.filter(
    (ticket) => (ticket.id = selectedTicketId),
  );

  return (
    <div className="w-full">
      <List>
        <Icon name="user-web/ticketing/calender" width={40} height={40} />
        {dayjs(selectiedTicketInfo[0]?.concertDateTime).format(
          'YYYY년 MM월 DD일',
        )}
      </List>
      <List>
        <Icon name="user-web/ticketing/time" width={40} height={40} />
        {dayjs(selectiedTicketInfo[0]?.concertDateTime)
          .format('h:mm a')
          .toUpperCase()}
      </List>
    </div>
  );
}

function List({ children }: PropsWithChildren) {
  return (
    <div className="w-full py-3 flex gap-5 items-center justify-start border-b-[1px] border-swifty-color-400 dark:border-swifty-color-700 text-18 font-semibold">
      {children}
    </div>
  );
}
