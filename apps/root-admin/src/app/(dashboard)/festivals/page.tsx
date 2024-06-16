import Link from "next/link";
import { FestivalPanel, PanelList } from '@components/festival';
import { getAllFestivals } from './data';
import type { FestivalInfoResponse } from "@type/festival";

import styles from './page.module.css';

export default async function Page() {
  const datas = await getAllFestivals();
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>축제 관리</h2>
      <PanelList className={styles.panelList}>
        {datas.map(({ subId, name, addr, description, startDate, endDate }: FestivalInfoResponse) =>
          <Link href={`festivals/${subId}`} key={subId}>
            <FestivalPanel
              className={styles.panel}
              name={name}
              addr={addr}
              description={description}
              startDate={startDate}
              endDate={endDate}
            />
          </Link>
        )}
      </PanelList>
    </main>
  );
}
