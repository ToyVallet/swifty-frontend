import { Hero, ImageWithFallback, MenuTiles, TileHeader, TileInfo } from '@components/common';
import FadeOverlay from '@components/common/carousel/fade-overlay';
import { LineUpSection, TopCard } from '@components/festival';
import type { Locale, Params } from '@lib/types';
import formatDate from '@lib/utils/parser/format-date';
import { BsBellFill } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';
import FallbackHero from '@images/fallback-hero.png';

import { getFestivalInfos, getLineups } from './action';

export default async function FestivalHomePage({
  params: { id, locale },
}: Params<{ id: string; locale: Locale }>) {
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
          src={festivalInfo.festivalimage ?? ''}
          alt={festivalInfo.festivalimage ?? ''}
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
            locale,
          )}
        />
        <MenuTiles tiles={tiles} />
        <LineUpSection lineups={lineups} />
      </main>
    </div>
  );
}
