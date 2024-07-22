import { AdBanner, LogoLink, Navigation } from '@components/common';
import { FestivalTiles } from '@components/home';
import type { Festival } from '@lib/types/festival';
import { http } from '@swifty/shared-lib';

export default async function AllFestivalsPage() {
  const fesivalLineups = await http.get<Festival[]>('/festival');

  return (
    <>
      <Navigation center={() => <LogoLink />} />
      <section className="mb-20 w-full flex flex-col gap-5 px-5 lg:mx-auto">
        <FestivalTiles
          festivals={fesivalLineups}
          variant="grid"
          headerPosiion="center"
        />
        <AdBanner src="/images/banner.png" />
      </section>
    </>
  );
}
