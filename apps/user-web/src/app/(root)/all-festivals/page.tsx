import { getLineupInfos } from '@app/action';
import { AdBanner } from '@components/common';
import { FestivalTiles } from '@components/home';

export default async function AllFestivalsPage() {
  const fesivalLineups = await getLineupInfos();
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