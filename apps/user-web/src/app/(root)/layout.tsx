import { Carousel, Footer, Hero, HeroTile } from '@components/common';
import type { PropsWithChildren } from 'react';

import { getLineupInfos } from '../action';

export default async function HomeLayout({ children }: PropsWithChildren) {
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
      {children}
      <Footer />
    </>
  );
}
