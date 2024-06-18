import { ConcertBoard, StatusNotifier } from '@components/festival';
import type { Params } from '@swifty/shared-lib';
import { Flex } from 'antd';

import { getDetailFestival } from './data';
import styles from './page.module.css';

export default async function Page({ params: { id } }: Params<{ id: string }>) {
  const {
    adminFestivalInfoResponse: { addr, festivalStatus },
    adminConcertInfoResponses,
  } = await getDetailFestival(id);
  return (
    <main className={styles.main}>
      <Flex align="center" gap={'1rem'} className={styles.headerWrapper}>
        <h2 className={styles.heading}>{addr}</h2>
        <StatusNotifier
          className={styles.statusNotifier}
          status={festivalStatus}
        />
      </Flex>
      <ConcertBoard
        festivalSubId={id}
        concertsInfo={adminConcertInfoResponses}
      />
    </main>
  );
}
