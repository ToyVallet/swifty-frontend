import {
  DrawerButton,
  FestivalCreateForm,
  FestivalPanel,
  PanelList,
} from '@components';
import { API_UNIVERSITY, FETCH_TAG } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { FestivalInfoResponse } from '@type';
import Link from 'next/link';

import styles from './university-festival.module.css';

export default async function UniversityFestivals({ id }: { id: string }) {
  const datas = await customFetch<FestivalInfoResponse[]>(
    API_UNIVERSITY.festivals(id),
    {
      method: 'GET',
      next: { tags: [FETCH_TAG.festivals, id] },
    },
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
