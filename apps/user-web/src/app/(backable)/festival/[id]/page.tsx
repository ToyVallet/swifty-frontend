import type { TileInfo } from '@components/common';
import {
  Hero,
  ImageWithFallback,
  MenuTiles,
  TileHeader,
} from '@components/common';
import { FadeOverlay } from '@components/common';
import { LineUpSection, TopCard } from '@components/festival';
import FallbackHero from '@images/fallback-hero.png';
import { API_FESTIVALS } from '@lib/constants';
import type { LineupApi } from '@lib/types/apit';
import type { Festival } from '@lib/types/festival';
import formatDate from '@lib/utils/parser/format-date';
import { type Params, customFetch } from '@swifty/shared-lib';
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
      subtitle: 'Line-up',
      title: <TileHeader>라인업</TileHeader>,
      link: `/festival/${id}#line-up`,
      icon: <BsBellFill size={17} />,
      bgColor: 'bg-white text-black',
    },
  ];

  return (
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
      <main className="px-5 flex flex-col gap-10">
        <TopCard
          title={festivalInfo.name}
          description={festivalInfo.description}
          period={formatDate(
            festivalInfo.startDate,
            festivalInfo.endDate,
            'ko',
          )}
        />
        <MenuTiles tiles={tiles} />
        <LineUpSection concerts={lineup.concertsResponse} />
      </main>
    </div>
  );
}
