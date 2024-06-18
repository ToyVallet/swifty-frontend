import {
  BreadCrumbs,
  type BreadcrumbList,
  DrawerButton,
  LineUpCard,
  LineupCreateForm,
  StatusNotifier,
} from '@components';
import { type Params, cn } from '@swifty/shared-lib';
import { Col, Flex, Row } from 'antd';

import { getDetailFestival } from '../get-detail-festival';
import styles from './concert-page.module.css';

export default async function ConcertPage({
  params,
}: Params<{ 'concert-id': string; id: string }>) {
  const consetId = params['concert-id'];
  const festivalId = params['id'];

  const {
    adminFestivalInfoResponse: { addr, name },
    adminConcertInfoResponses,
  } = await getDetailFestival(festivalId);

  const concertInfo = adminConcertInfoResponses.find(
    (concert) => concert.subId === consetId,
  )!;

  const lineUp = concertInfo.lineUpInfoResponses;

  const breadcrumbList: BreadcrumbList = [
    { path: '/festivals', title: 'Festival' },
    { path: `/${festivalId}`, title: `${name} (${addr})` },
    { title: concertInfo?.name },
  ];

  return (
    <main className={styles.main}>
      <Flex align="center" gap={'1rem'} className={styles.headerWrapper}>
        <BreadCrumbs breadcrumbList={breadcrumbList} />
        <StatusNotifier status={concertInfo.concertStatus} />
      </Flex>
      <Flex className={styles.wrapper} vertical align="end">
        <DrawerButton
          className={styles.concertCreateButton}
          variant="lineup-create"
        >
          <LineupCreateForm concertSubId={consetId} festivalId={festivalId} />
        </DrawerButton>
      </Flex>
      <div className={cn(styles.wrapper, styles.gridContainer)}>
        {lineUp.map((item) => (
          <LineUpCard key={item.subId} festivalSubId={festivalId} {...item} />
        ))}
      </div>
    </main>
  );
}
