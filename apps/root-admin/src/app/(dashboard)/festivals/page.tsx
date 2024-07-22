import { FestivalPanel, PanelList } from '@components';
import { http } from '@swifty/shared-lib';
import { type FestivalInfoResponse } from '@type';
import Link from 'next/link';

import styles from './page.module.css';

export default async function Page() {
  const datas = await http.get<FestivalInfoResponse[]>('/festival');

  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>축제 관리</h2>
      <PanelList className={styles.panelList}>
        {datas.map((data) => (
          <Link href={`festivals/${data.id}`} key={data.id}>
            <FestivalPanel className={styles.panel} {...data} />
          </Link>
        ))}
      </PanelList>
    </main>
  );
}
