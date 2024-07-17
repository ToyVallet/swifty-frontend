import { FixedBottomGroup, ImageWithFallback } from '@components/common';
import { DateSelect } from '@components/festival/ticketing';
import FallbackImage from '@images/fallback-festival.png';
import { type Festival } from '@lib/types/festival';
import { type Params, customFetch } from '@swifty/shared-lib';
import { Button } from '@swifty/ui';

export interface TicketingDate {
  name: string;
  ticketingId: string;
  concertDateTime: string;
  ticketingStartDateTime: string;
  ticketingEndDateTime: string;
  ticketingAvailable: boolean;
  fieldLength: number;
}

export default async function DateSelectionPage({
  params: { id },
}: Params<{ id: string }>) {
  // 데이터 페칭 추가
  const dates: TicketingDate[] = await Promise.resolve([
    {
      name: 'Day 1',
      ticketingId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      concertDateTime: '2021-12-31 23:59:59',
      ticketingStartDateTime: '2021-12-01 00:00:00',
      ticketingEndDateTime: '2021-12-31 23:59:59',
      ticketingAvailable: true,
      fieldLength: 1,
    },
    {
      name: 'Day 2',
      ticketingId: '3fa85f64-5717-4562-b3fc-2c963f66afad',
      concertDateTime: '2022-01-01 23:59:59',
      ticketingStartDateTime: '2021-12-01 00:00:00',
      ticketingEndDateTime: '2022-01-01 23:59:59',
      ticketingAvailable: true,
      fieldLength: 1,
    },
  ]);

  const festivalInfo = await customFetch<Festival>(`/festival/${id}`);

  // const dates = await customFetch<TicketingDate[]>(
  //   `/ticketing/schedule/${id}`,
  //   {
  //     method: 'GET',
  //     credentials: 'include',
  //   },
  // );

  return (
    <div>
      <div className="flex flex-col w-full items-center gap-10 text-white px-5">
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
            {festivalInfo.startDate} - {festivalInfo.endDate}
          </p>
        </div>
      </div>
      <FixedBottomGroup className="gap-5">
        <DateSelect options={dates} />
        <Button size="full">확인</Button>
      </FixedBottomGroup>
    </div>
  );
}