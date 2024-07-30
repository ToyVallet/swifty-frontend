import type { TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import { FadeOverlay, Hero, ImageWithFallback, Main } from '@components/common';
import {
  TicketFixedCta,
  TicketInfo,
  TicketingCheckTopCard,
} from '@components/festival/ticketing';
import TicketDescription from '@components/festival/ticketing/check/ticket-description';
import FallbackHero from '@images/fallback-festival.png';
import type { Festival } from '@lib/types/festival';
import type { Params } from '@swifty/shared-lib';
import { http } from '@swifty/shared-lib';

export default async function TicketingCheckPage({
  params: { id },
}: Params<{ id: string }>) {
  const festivalInfo = await http.get<Festival>('/festival/{id}', {
    params: { id },
  });

  const ticketings = await http.get<TicketingDate[]>('/ticketing/{id}', {
    credentials: 'include',
    params: { id },
  });

  return (
    <div className="bg-swifty-color-100 dark:bg-swifty-color-dark-bg">
      <Hero variant="image">
        <ImageWithFallback
          src={festivalInfo.festivalImage}
          alt={festivalInfo.name}
          width={500}
          height={500}
          fallback={FallbackHero}
        />
        <FadeOverlay />
      </Hero>
      <Main className="px-5 gap-[25px]">
        <TicketingCheckTopCard
          title={festivalInfo.name}
          description={festivalInfo.description}
        />
        <TicketInfo ticketing={ticketings} />
        <TicketDescription />
      </Main>
      <TicketFixedCta />
    </div>
  );
}
