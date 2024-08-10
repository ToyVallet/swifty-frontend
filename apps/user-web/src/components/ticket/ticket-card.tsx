import type { UserTicketApi } from '@lib/types';
import { Icon } from '@swifty/assets';
import { dayDifference } from '@swifty/shared-lib';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function TicketCard(props: UserTicketApi) {
  const { ticketId, festivalName, concertDate } = props;
  const dDay = dayDifference(concertDate);
  return (
    <div className="px-4 dark:bg-swifty-color-900 bg-swifty-color-100 rounded-xl py-4 flex flex-col gap-2 justify-center divide-y divide-swifty-color-200 dark:divide-swifty-color-700">
      <div className="flex justify-between items-center py-2">
        <h1 className="text-13 font-normal dark:text-swifty-color-300 text-swifty-color-400">
          예매 번호: {ticketId.slice(0, 6)}
        </h1>
        <span className="text-primary text-16 font-bold">{dDay}</span>
      </div>
      <div className="flex flex-col gap-2 py-2">
        <h1 className="text-14 font-bold">{festivalName}</h1>
        <div className="dark:text-swifty-color-300 text-swifty-color-400 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Icon
              name="user-web/ticket-list/calender"
              width={18}
              height={18}
              className="fill-swifty-color-300"
            />
            <h1>{dayjs(concertDate).format('YYYY년 MM월 DD일')}</h1>
          </div>
          <div>{dayjs(concertDate).format('a h:mm').toUpperCase()}</div>
        </div>
      </div>
      <Link
        href={`/ticket/${ticketId}`}
        className="flex justify-between items-center py-2 text-primary text-13 font-semibold"
      >
        QR 일반 티켓 보기
        <Icon
          name="arrow-right"
          width={24}
          height={24}
          className="fill-primary"
        />
      </Link>
    </div>
  );
}
