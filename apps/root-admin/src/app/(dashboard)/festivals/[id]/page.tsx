import type { BreadcrumbList } from '@components';
import {
  BreadCrumbs,
  ConcertCreateForm,
  ConcertPanel,
  DrawerButton,
  StatusNotifier,
} from '@components';
import type { Params } from '@swifty/shared-lib';
import { Flex } from 'antd';

import { getDetailFestival } from './get-detail-festival';
import styles from './page.module.css';

export default async function Page({ params: { id } }: Params<{ id: string }>) {
  const {
    adminFestivalInfoResponse: { addr, festivalStatus, name, subId },
    adminConcertInfoResponses,
  } = await getDetailFestival(id);

  const breadcrumbList: BreadcrumbList = [
    { path: '/festivals', title: 'Festival' },
    { title: `${name} (${addr})` },
  ];
  return (
    <main className={styles.main}>
      <Flex align="center" gap={'1rem'} className={styles.headerWrapper}>
        <BreadCrumbs breadcrumbList={breadcrumbList} />
        <StatusNotifier
          className={styles.statusNotifier}
          status={festivalStatus}
        />
      </Flex>
      <Flex className={styles.wrapper} vertical align="end">
        <DrawerButton
          className={styles.concertCreateButton}
          variant="concert-create"
        >
          <ConcertCreateForm festivalSubId={subId} />
        </DrawerButton>
      </Flex>
      <Flex className={styles.wrapper} vertical gap={'1rem'}>
        {adminConcertInfoResponses.map((item) => (
          <ConcertPanel
            key={item.subId}
            className={styles.panel}
            festivalSubId={subId}
            {...item}
          />
        ))}
      </Flex>
    </main>
  );
}
