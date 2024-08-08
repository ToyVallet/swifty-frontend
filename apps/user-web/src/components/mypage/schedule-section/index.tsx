import { Carousel } from '@components/common';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import type { UserTicketApi } from '@lib/types';
import { dayDifference, http } from '@swifty/shared-lib';
import dayjs from 'dayjs';

import Card from './card';

const schedule = ['축제 일정', '완료된 일정'] as const;

export default async function ScheduleCard() {
  const availableTicketings = await http.get<UserTicketApi[]>('/user/ticket', {
    credentials: 'include',
  });
  const overDateTicketings = await http.get<UserTicketApi[]>('/user/ticket', {
    params: { ticketStatus: 'OVER_DATE' },
    credentials: 'include',
  });

  return (
    <section className="w-full">
      <Tabs defaultValue={schedule[0]}>
        <TabsList>
          {schedule.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={schedule[0]}>
          <Carousel autoplay hasDotButton>
            {availableTicketings.map((available) => (
              <Card
                title={available.festivalName}
                date={dayjs(available.concertDate).format(
                  'YYYY년 MMd월 DD일 hh:mm a',
                )}
                backgroundImage={available.festivalImage}
                enterAt={dayDifference(available.concertDate)}
                ticketId={available.ticketId}
                festivalId={available.festivalId}
                lineups={[]}
                key={available.ticketId}
              />
            ))}
          </Carousel>
        </TabsContent>
        <TabsContent value={schedule[1]}>
          <Carousel autoplay hasDotButton>
            {overDateTicketings.map((available) => (
              <Card
                title={available.festivalName}
                date={dayjs(available.concertDate).format(
                  'YYYY년 MMd월 DD일 hh:mm a',
                )}
                backgroundImage={available.festivalImage}
                enterAt={dayDifference(available.concertDate)}
                ticketId={available.ticketId}
                festivalId={available.festivalId}
                lineups={[]}
                key={available.ticketId}
              />
            ))}
          </Carousel>
        </TabsContent>
      </Tabs>
    </section>
  );
}
