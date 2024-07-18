import type { TileInfo } from '@components/common';
import {
  Footer,
  Hero,
  ImageWithFallback,
  Main,
  MenuTiles,
  Navigation,
  TileHeader,
} from '@components/common';
import { FadeOverlay } from '@components/common';
import { LineUpSection, TopCard } from '@components/festival';
import FallbackHero from '@images/fallback-hero.png';
import { API_FESTIVALS } from '@lib/constants';
import type { LineupApi } from '@lib/types/api';
import type { Festival } from '@lib/types/festival';
import { type Params, customFetch, formatDateRange } from '@swifty/shared-lib';
import { BsBellFill } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';

export default async function FestivalHomePage({
  params: { id },
}: Params<{ id: string }>) {
  const festivalInfo = await customFetch<Festival>(API_FESTIVALS.festival(id), {
    method: 'GET',
  });
  const lineup = await customFetch<LineupApi>(API_FESTIVALS.lineUp(id), {
    method: 'GET',
  });

  const tiles: TileInfo[] = [
    {
      id: 1,
      subtitle: 'info',
      title: (
        <TileHeader>
          축제 정보
          <br />
          인스타그램
        </TileHeader>
      ),
      link: '#',
      icon: <TiStarFullOutline size={17} />,
      bgColor: 'bg-primary text-white border-none',
    },
    {
      id: 2,
      subtitle: 'Ticketing',
      title: <TileHeader>티켓 예매하기</TileHeader>,
      link: `/festival/${id}/ticketing`,
      icon: <BsBellFill size={17} />,
      bgColor: 'bg-white text-black',
    },
  ];

  return (
    <>
      <Navigation variant="back" bg="gradient" centerLogo />
      <div className="mb-[90px]">
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
        <Main className="px-5 gap-10">
          <TopCard
            title={festivalInfo.name}
            description={festivalInfo.description}
            period={formatDateRange(
              festivalInfo.startDate,
              festivalInfo.endDate,
            )}
          />
          <MenuTiles tiles={tiles} />
          <LineUpSection concerts={lineup.concertsResponse} />
        </Main>
      </div>
      <Footer />
    </>
  );
}
