import { Card, CardList, DrawerButton, FestivalCreateForm } from '@components';
import { API_UNIVERSITY, FETCH_TAG, getFestivalStatus } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { FestivalInfoResponse } from '@type';
import Link from 'next/link';

import styles from './university-festival.module.css';

export default async function UniversityFestivals({ id }: { id: string }) {
  const data = await customFetch<FestivalInfoResponse[]>(
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
      <CardList className={styles.cardList}>
        {data.map(({ subId, name, addr, description, startDate, endDate }) => (
          <Link href={`/festivals/${subId}`} key={subId}>
            <Card>
              <Card.FestvialDescription
                name={name}
                addr={addr}
                description={description}
                startDate={startDate}
                endDate={endDate}
                status={getFestivalStatus(startDate, endDate)}
              />
            </Card>
          </Link>
        ))}
      </CardList>
    </section>
  );
}
