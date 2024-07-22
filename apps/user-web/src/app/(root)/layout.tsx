import {
  Carousel,
  Footer,
  GlobalNavigation,
  Hero,
  HeroTile,
} from '@components/common';
import type { Festival } from '@lib/types/festival';
import { http } from '@swifty/shared-lib';
import type { PropsWithChildren } from 'react';

export default async function HomeLayout({ children }: PropsWithChildren) {
  const festivalLineups = await http.get<Festival[]>('/festival');

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
      <GlobalNavigation />
      <Footer />
    </>
  );
}
