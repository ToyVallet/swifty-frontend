import type { TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import { FadeOverlay, Hero, ImageWithFallback, Main } from '@components/common';
import {
  TicketFixedCta,
  TicketInfo,
  TicketingCheckTopCard,
} from '@components/festival/ticketing';
import TicketDescription from '@components/festival/ticketing/check/ticket-description';
import FallbackHero from '@images/fallback-festival.png';
import type { LineupApi } from '@lib/types';
import type { Params } from '@swifty/shared-lib';
import { http } from '@swifty/shared-lib';

export default async function TicketingCheckPage({
  params: { id },
}: Params<{ id: string }>) {
  const { festivalInfoResponse, concertsResponse, thumbnailImage, logoImage } =
    await http.get<LineupApi>('/festival/detail/{id}', {
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
          src={thumbnailImage}
          alt={festivalInfoResponse.name}
          width={500}
          height={500}
          fallback={FallbackHero}
        />
        <FadeOverlay />
      </Hero>
      <Main className="px-5 gap-[25px]">
        <TicketingCheckTopCard
          title={festivalInfoResponse.name}
          description={festivalInfoResponse.addr}
          iconSrc={logoImage}
        />
        <TicketInfo
          ticketing={ticketings}
          concertsResponse={concertsResponse}
        />
        <TicketDescription description={festivalInfoResponse.description} />
      </Main>
      <TicketFixedCta />
    </div>
  );
}
