import {
  BreadCrumbs,
  type BreadcrumbList,
  ConcertButtonList,
  LineUpCard,
  OpenHiddenToggle,
} from '@components';
import { type Params, cn } from '@swifty/shared-lib';
import { Flex } from 'antd';

import { getDetailFestival } from '../get-detail-festival';
import styles from './concert-page.module.css';

export default async function ConcertPage({
  params,
}: Params<{ 'concert-id': string; id: string }>) {
  const consertId = params['concert-id'];
  const festivalId = params['id'];

  const {
    adminFestivalInfoResponse: { addr, name },
    adminConcertInfoResponses,
  } = await getDetailFestival(festivalId);

  const concertInfo = adminConcertInfoResponses.find(
    (concert) => concert.id === consertId,
  )!;

  const lineup = concertInfo.lineupInfoResponses;

  const breadcrumbList: BreadcrumbList = [
    { path: '/festivals', title: 'Festival' },
    { path: `/${festivalId}`, title: `${name} (${addr})` },
    { title: concertInfo?.name },
  ];

  return (
    <main className={styles.main}>
      <Flex align="center" gap={'1rem'} className={styles.headerWrapper}>
        <BreadCrumbs breadcrumbList={breadcrumbList} />
        <OpenHiddenToggle
          apiTarget="CONCERT"
          status={concertInfo.concertStatus}
          id={consertId}
          festivalId={festivalId}
          size="large"
        />
      </Flex>
      <ConcertButtonList {...concertInfo} festivalId={festivalId} />

      <div className={cn(styles.wrapper, styles.gridContainer)}>
        {lineup.map((item) => (
          <LineUpCard key={item.id} festivalId={festivalId} {...item} />
        ))}
      </div>
    </main>
  );
}
