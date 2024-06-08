import { StatusNotifier, ConcertBoard } from "@components/festival";
import { getDetailFestival } from "./data";
import { StatusNotifier, TableBoard } from '@components/festival';
import type { Params } from '@swifty/shared-lib';

import { getMockFestivalDetail } from './data';
import styles from './page.module.css';

export default async function Page({ params: { id } }: {
  params: { id: string }
}) {
  const {
    adminFestivalInfoResponse,
    adminConcertInfoResponses
  } = await getDetailFestival(id);
  return (
    <main className={styles.main}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.heading}>{adminFestivalInfoResponse.addr}</h2>
        <StatusNotifier
          className={styles.statusNotifier}
          status={adminFestivalInfoResponse.festivalStatus}
        />
      </div>
      <ConcertBoard
        festivalSubId={id}
        concertsInfo={adminConcertInfoResponses}
      />
    </main>
  );
}
