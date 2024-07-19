import { AdBanner } from '@components/common';
import { FestivalTiles } from '@components/home';
import { API_FESTIVALS } from '@lib/constants';
import type { Festival } from '@lib/types/festival';
import { customFetch } from '@swifty/shared-lib';
import { Button } from '@swifty/ui';
import Link from 'next/link';

export default async function Home() {
  const festivalLineups = await customFetch<Festival[]>(
    API_FESTIVALS.festivals(),
  );

  return (
    <section className="mb-20 w-full flex flex-col gap-10 px-5 z-10 lg:mx-auto">
      <FestivalTiles festivals={festivalLineups} />
      <Button block asChild variant="outlined">
        <Link href="/all-festivals">페스티벌 전체 보기</Link>
      </Button>
      <AdBanner src="/images/banner.png" />
    </section>
  );
}
