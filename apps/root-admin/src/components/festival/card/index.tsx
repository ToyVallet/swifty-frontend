import { ConcertUpdateForm, StatusNotifier } from '@components/festival';
import { DrawerButton } from '@components/ui';
import formatDate from '@lib/util/formatDate';
import type { ConcertsResponse } from '@type/concert';
import { Button } from 'antd';
import type { PropsWithChildren } from 'react';

import styles from './card.module.css';

export default function Card({ children }: PropsWithChildren) {
  return <li className={styles.item}>{children}</li>;
}
function FestivalDescription({
  name,
  addr,
  description,
  startDate,
  endDate,
  status,
}: {
  name: string;
  addr: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'BEFORE' | 'PROCESS' | 'CLOSED';
}) {
  return (
    <div className={styles.description}>
      <h3 className={styles.heading}>{name}</h3>
      <span className={styles.content}>{addr}</span>
      <span className={styles.content}>{description}</span>
      <span
        className={styles.content}
      >{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
      <StatusNotifier status={status} />
    </div>
  );
}

function ConcertDescription({
  name,
  location,
  startDate,
  endDate,
  description,
  concertStatus,
}: ConcertsResponse) {
  return (
    <div className={styles.description}>
      <span className={styles.content}>{location}</span>
      <span className={styles.content}>{description}</span>
      <span
        className={styles.content}
      >{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
      <StatusNotifier status={concertStatus} />
      <DrawerButton variant="concert-update">
        <ConcertUpdateForm />
      </DrawerButton>
      <Button>삭제</Button>
    </div>
  );
}

FestivalDescription.displayName = 'Festival Description';
Card.FestvialDescription = FestivalDescription;

ConcertDescription.displayName = 'Concert Description';
Card.ConcertDescription = ConcertDescription;
