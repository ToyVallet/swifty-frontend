import { getLineupInfos } from '@app/action';
import { AdBanner, Link } from '@components/common';
import { FestivalTiles } from '@components/home';

export default async function Home() {
  const festivalLineups = await getLineupInfos(5);
  return (
    <section className="mb-20 w-full flex flex-col gap-10 px-5 z-10 lg:mx-auto">
      <FestivalTiles festivals={festivalLineups} />
      <Link
        variant="outlined"
        href="/all-festivals"
        className="border-white rounded-xl text-white"
      >
        페스티벌 전체 보기
      </Link>
      <AdBanner src="/images/banner.png" />
    </section>
  );
}
