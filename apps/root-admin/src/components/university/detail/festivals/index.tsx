import {
  DrawerButton,
  FestivalCreateForm,
  FestivalPanel,
  PanelList,
} from '@components';
import { http } from '@swifty/shared-lib';
import type { FestivalInfoResponse } from '@type';
import Link from 'next/link';

import styles from './university-festival.module.css';

export default async function UniversityFestivals({ id }: { id: string }) {
  const datas = await http.get<FestivalInfoResponse[]>(
    '/host/admin/festival/{id}/university',
    { params: { id }, credentials: 'include' },
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>축제 관리</h2>
        <DrawerButton variant="festival-create">
          <FestivalCreateForm id={id} />
        </DrawerButton>
      </div>
      <PanelList className={styles.panelList}>
        {datas.map((data) => (
          <Link href={`/festivals/${data.id}`} key={data.id}>
            <FestivalPanel {...data} />
          </Link>
        ))}
      </PanelList>
    </section>
  );
}
