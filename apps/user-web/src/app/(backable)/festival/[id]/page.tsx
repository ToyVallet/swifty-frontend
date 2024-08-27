import type { TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import type { TileInfo } from '@components/common';
import {
  Footer,
  Hero,
  ImageWithFallback,
  LogoLink,
  Main,
  MenuTiles,
  Navigation,
  TileHeader,
} from '@components/common';
import { FadeOverlay } from '@components/common';
import { LineUpSection, TopCard } from '@components/festival';
import FallbackHero from '@images/fallback-hero.png';
import type { LineupApi } from '@lib/types/api';
import type { VerficationAPI } from '@lib/types/certification';
import type { Festival } from '@lib/types/festival';
import {
  type Params,
  formatDateRange,
  getCookie,
  http,
} from '@swifty/shared-lib';
import { BsBellFill } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';

async function getCertification() {
  // 재학 정보 가지고 오기
  const token = await getCookie('accessToken');
  if (token) {
    try {
      const { certificationStatus } = await http.get<VerficationAPI>(
        '/certification/check',
      );
      if (certificationStatus === 'APPROVED') return true;
      return false;
    } catch (err) {
      return false;
    }
  }
  return false;
}

export default async function FestivalHomePage({
  params: { id },
}: Params<{ id: string }>) {
  const festivalInfo = await http.get<Festival>('/festival/{id}', {
    params: { id },
  });
  const lineup = await http.get<LineupApi>('/festival/detail/{id}', {
    params: { id },
  });

  // 재학 인증 상태 확인하기
  const isCertificate = await getCertification();

  const tiles: TileInfo[] = [
    {
      id: 1,
      festivalId: id,
      subtitle: 'info',
      title: (
        <TileHeader>
          축제 정보
          <br />
          인스타그램
        </TileHeader>
      ),
      link: '#',
      icon: <TiStarFullOutline size={17} />,
      bgColor: 'bg-primary text-white border-none',
    },
    {
      id: 2,
      festivalId: id,
      subtitle: 'Ticketing',
      title: <TileHeader>티켓 예매하기</TileHeader>,
      link: `/festival/${id}/ticketing`,
      icon: <BsBellFill size={17} />,
      bgColor: 'dark:bg-white dark:text-black text-white bg-black',
      isCertificate,
    },
  ];

  return (
    <>
      <Navigation bg="gradient" center={() => <LogoLink />} />
      <div className="mb-[90px]  bg-swifty-color-100 dark:bg-swifty-color-dark-bg">
        <Hero variant="image">
          <ImageWithFallback
            src={festivalInfo.festivalImage}
            alt={festivalInfo.name}
            width={500}
            height={500}
            fallback={FallbackHero}
          />
          <FadeOverlay />
        </Hero>
        <Main className="px-5 gap-10">
          <TopCard
            title={festivalInfo.name}
            description={festivalInfo.description}
            period={formatDateRange(
              festivalInfo.startDate,
              festivalInfo.endDate,
            )}
          />
          <MenuTiles tiles={tiles} />
          <LineUpSection concerts={lineup.concertsResponse} />
        </Main>
      </div>
      <Footer />
    </>
  );
}
