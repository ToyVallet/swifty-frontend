import { getLineupInfos } from '@/app/[locale]/(root-nav)/action';
import { AdBanner, Navigation } from '@/app/components/common';
import { FestivalTiles } from '@/app/components/home';

export default async function Page() {
  const fesivalLineups = await getLineupInfos();
  return (
    <>
      <Navigation variant="back-with-logo" />
      <div className="mb-20 w-full flex flex-col gap-5 px-5 lg:mx-auto">
        <FestivalTiles
          festivals={fesivalLineups}
          variant="grid"
          headerPosiion="center"
        />
        <AdBanner src="/images/banner.png" />
      </div>
    </>
  );
}
