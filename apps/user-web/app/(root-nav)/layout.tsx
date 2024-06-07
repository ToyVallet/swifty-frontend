import { getLineupHero } from '@app/(root-nav)/action';
import { Carousel, Footer, Hero, HeroTile } from '@components/common';
import type { PropsWithChildren } from 'react';

export default async function RootNavLayout({ children }: PropsWithChildren) {
  const fetivalLineups = await getLineupHero();
  return (
    <>
      <Hero>
        <Carousel hasIndicator autoplay>
          {fetivalLineups.map((fetsival) => (
            <HeroTile key={fetsival.name} {...fetsival} />
          ))}
        </Carousel>
      </Hero>
      {children}
      <Footer />
    </>
  );
}
