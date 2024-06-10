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
import formatDate from '@lib/utils/parser/format-date';
import type { Params } from '@swifty/shared-lib';
import { BsBellFill } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';

import { getFestivalInfos, getLineups } from './action';

export default async function FestivalHomePage({
  params: { id },
}: Params<{ id: string }>) {
  const festivalInfo = await getFestivalInfos(Number(id));
  const lineups = await getLineups(Number(id));

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
      link: festivalInfo.url,
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
          src={festivalInfo.festivalimage}
          alt={festivalInfo.festivalimag}
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
            festivalInfo.startdate,
            festivalInfo.enddate,
            'ko',
          )}
        />
        <MenuTiles tiles={tiles} />
        <LineUpSection lineups={lineups} />
      </main>
    </div>
  );
}
