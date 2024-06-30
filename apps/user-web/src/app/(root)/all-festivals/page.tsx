import { AdBanner } from '@components/common';
import { FestivalTiles } from '@components/home';
import { API_FESTIVALS } from '@lib/constants';
import type { Festival } from '@lib/types/festival';
import { customFetch } from '@swifty/shared-lib';

export default async function AllFestivalsPage() {
  const fesivalLineups = await customFetch<Festival[]>(
    API_FESTIVALS.festivals(),
    { method: 'GET' },
  );
  return (
    <section className="mb-20 w-full flex flex-col gap-5 px-5 lg:mx-auto">
      <FestivalTiles
        festivals={fesivalLineups}
        variant="grid"
        headerPosiion="center"
      />
      <AdBanner src="/images/banner.png" />
    </section>
  );
}
