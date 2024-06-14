import { StatusNotifier, TableBoard } from '@components';
import type { Params } from '@swifty/shared-lib';

import { getMockFestivalDetail } from './data';
import styles from './page.module.css';

export default async function Page({ params: { id } }: Params<{ id: string }>) {
  const { adminFestivalInfoResponse, adminConcertInfoResponses } =
    await getMockFestivalDetail(id);
  return (
    <main className={styles.main}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.heading}>{adminFestivalInfoResponse.addr}</h2>
        <StatusNotifier
          className={styles.statusNotifier}
          status={adminFestivalInfoResponse.festivalStatus}
        />
      </div>
      <TableBoard concertsInfo={adminConcertInfoResponses} />
    </main>
  );
}
