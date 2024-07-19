import {
  Carousel,
  Footer,
  GlobalNavigation,
  Hero,
  HeroTile,
} from '@components/common';
import { API_FESTIVALS } from '@lib/constants';
import type { Festival } from '@lib/types/festival';
import { customFetch } from '@swifty/shared-lib';
import type { PropsWithChildren } from 'react';

export default async function HomeLayout({ children }: PropsWithChildren) {
  const festivalLineups = await customFetch<Festival[]>(
    `${API_FESTIVALS.festivals()}`,
    { method: 'GET' },
  );

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
