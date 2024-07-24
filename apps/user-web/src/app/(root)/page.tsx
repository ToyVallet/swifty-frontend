import { AdBanner, Navigation } from '@components/common';
import LogoLink from '@components/common/navigation/logo-link';
import { FestivalTiles } from '@components/home';
import type { Festival } from '@lib/types/festival';
import { http } from '@swifty/shared-lib';
import { Button } from '@swifty/ui';
import Link from 'next/link';

export default async function Home() {
  const festivalLineups = await http.get<Festival[]>('/festival');

  return (
    <>
      <Navigation bg="gradient" left={() => <LogoLink />} />
      <section className="mb-20 w-full flex flex-col gap-10 px-5 z-10 lg:mx-auto">
        <FestivalTiles festivals={festivalLineups} />
        <Button
          block
          asChild
          variant="outlined"
          className="border-black dark:border-white"
        >
          <Link href="/all-festivals">페스티벌 전체 보기</Link>
        </Button>
        <AdBanner src="/images/banner.png" />
      </section>
    </>
  );
}
