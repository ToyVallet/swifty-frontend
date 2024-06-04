import { getLineupHero } from '@/app/[locale]/(root-nav)/action';
import { Carousel, Footer, Hero, HeroTile } from '@/app/components/common';
import { festivalLinupes } from '@/app/lib/mock/data';
import { PropsWithChildren } from 'react';

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
