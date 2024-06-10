import { AdBanner, Carousel, Hero, HeroTile, Link } from '@components/common';
import FestivalTiles from '@components/home/festival-tile';

import { getLineupInfos } from '../action';

export default async function Home() {
  const festivalLineups = await getLineupInfos(1);

  return (
    <>
      <Hero>
        <Carousel hasIndicator autoplay>
          {festivalLineups.map((festival) => (
            <HeroTile key={festival.name} {...festival} />
          ))}
        </Carousel>
      </Hero>
      <section className="mb-20 w-full flex flex-col gap-10 px-5 z-10 lg:mx-auto">
        <FestivalTiles festivals={festivalLineups} />
        <Link
          variant="outlined"
          href="/all-festivals"
          className="border-white rounded-xl text-white"
        >
          페스티벌 전체 보기
        </Link>
        <AdBanner src="/images/banner.png" />
      </section>
    </>
  );
}
