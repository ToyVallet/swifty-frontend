import {
  AdBanner,
  Carousel,
  Footer,
  Hero,
  HeroTile,
  Link,
  Navigation,
} from '@components/common';
import FestivalTiles from '@components/home/festival-tile';

import { getLineupHero, getLineupInfos } from './action';

export default async function Home() {
  const festivalLinupes = await getLineupInfos();
  const fetivalLineups = await getLineupHero();
  return (
    <>
      <Navigation variant="main" />
      <Hero>
        <Carousel hasIndicator autoplay>
          {fetivalLineups.map((fetsival) => (
            <HeroTile key={fetsival.name} {...fetsival} />
          ))}
        </Carousel>
      </Hero>
      <div className="mb-20 w-full flex flex-col gap-10 px-5 z-10 lg:mx-auto">
        <FestivalTiles festivals={festivalLinupes} />
        <Link
          variant="outlined"
          href="/festivals"
          className="border-white rounded-xl text-white"
        >
          페스티벌 전체 보기
        </Link>
        <AdBanner src="/images/banner.png" />
      </div>
      <Footer />
    </>
  );
}
