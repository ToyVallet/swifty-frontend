import { FestivalPanel, PanelList } from '@components';
import Link from 'next/link';

import { getAllFestivals } from './data';
import styles from './page.module.css';

export default async function Page() {
  const datas = await getAllFestivals();
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>축제 관리</h2>
      <PanelList className={styles.panelList}>
        {datas.map((data) => (
          <Link href={`festivals/${data.subId}`} key={data.subId}>
            <FestivalPanel className={styles.panel} {...data} />
          </Link>
        ))}
      </PanelList>
    </main>
  );
}
