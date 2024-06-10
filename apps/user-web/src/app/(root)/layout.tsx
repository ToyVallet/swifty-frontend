import {
  Carousel,
  Footer,
  Hero,
  HeroTile,
  Navigation,
} from '@components/common';
import type { PropsWithChildren } from 'react';

import { getLineupInfos } from '../action';

export default async function HomeLayout({ children }: PropsWithChildren) {
  const festivalLineups = await getLineupInfos(1);
  return (
    <>
      <Navigation variant="root" bg="gradient" search />
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
