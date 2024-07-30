import { ImageWithFallback } from '@components/common';
import { TicketingDateFixedButtonGroup } from '@components/festival/ticketing';
import FallbackImage from '@images/fallback-festival.png';
import { type Festival } from '@lib/types/festival';
import { type Params, http } from '@swifty/shared-lib';
import dayjs from 'dayjs';
import { redirect } from 'next/navigation';

export interface TicketingDate {
  name: string;
  id: string;
  concertDateTime: string;
  ticketingStartDateTime: string;
  ticketingEndDateTime: string;
  ticketingAvailable: boolean;
  fieldLength: number;
}

export default async function DateSelectionPage({
  params: { id },
}: Params<{ id: string }>) {
  const festivalInfo = await http.get<Festival>('/festival/{id}', {
    params: { id },
  });

  const ticketings = await http.get<TicketingDate[]>('/ticketing/{id}', {
    credentials: 'include',
    params: { id },
  });

  if (ticketings.length === 0) {
    redirect('/not-authorized');
  }

  return (
    <div>
      <div className="flex flex-col w-full items-center gap-10 px-5">
        <ImageWithFallback
          src={festivalInfo.festivalImage}
          fallback={FallbackImage}
          alt={festivalInfo.name}
          width={175}
          height={300}
          className="w-full rounded-xl h-[300px] object-cover"
        />
        <div className="flex flex-col items-center gap-[6px]">
          <h1 className="text-24 font-semibold">{festivalInfo.name}</h1>
          <p className="text-16 font-medium">
            {dayjs(festivalInfo.startDate).format('YYYY-MM-DD')} -{' '}
            {dayjs(festivalInfo.endDate).format('YYYY-MM-DD')}
          </p>
        </div>
      </div>
      <TicketingDateFixedButtonGroup ticketings={ticketings} />
    </div>
  );
}
