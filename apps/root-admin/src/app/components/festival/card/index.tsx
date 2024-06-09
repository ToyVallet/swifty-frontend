import type { ConcertsResponse } from '@app/types/concert';
import {
  ConcertUpdateForm,
  DrawerButton,
  StatusNotifier,
} from '@components/festival';
import formatDate from '@lib/util/formatDate';
import type { PropsWithClassName } from '@swifty/shared-lib';
import clsx from 'clsx';

import styles from './card.module.css';

export default function Card({ className, children }: PropsWithClassName) {
  return <li className={clsx(styles.item, className)}>{children}</li>;
}

function FestivalDescription({
  className,
  name,
  addr,
  description,
  startDate,
  endDate,
}: {
  name: string;
  addr: string;
  description: string;
  startDate: string;
  endDate: string;
} & PropsWithClassName) {
  return (
    <div className={clsx(styles.description, className)}>
      <h3 className={styles.heading}>{name}</h3>
      <span className={styles.content}>{addr}</span>
      <span className={styles.content}>{description}</span>
      <span className={styles.content}>{formatDate(startDate)}</span>
      <span className={styles.content}>{formatDate(endDate)}</span>
    </div>
  );
}

function ConcertDescription({
  className,
  festivalSubId,
  subId,
  name,
  location,
  startDate,
  endDate,
  description,
  concertStatus,
}: ConcertsResponse & { festivalSubId: string } & PropsWithClassName) {
  return (
    <div className={clsx(styles.description, className)}>
      <h3 className={styles.heading}>{location}</h3>
      <span className={styles.content}>{description}</span>
      <span className={styles.content}>{formatDate(startDate)}</span>
      <span className={styles.content}>{formatDate(endDate)}</span>
      <div className={styles.content}>
        <StatusNotifier status={concertStatus} />
      </div>
      <div className={styles.content}>
        <DrawerButton variant="concert-update">
          <ConcertUpdateForm
            festivalSubId={festivalSubId}
            subId={subId}
            name={name}
            location={location}
            startDate={startDate}
            endDate={endDate}
            description={description}
            concertStatus={concertStatus}
          />
        </DrawerButton>
      </div>
    </div>
  );
}

FestivalDescription.displayName = 'Festival Description';
Card.FestvialDescription = FestivalDescription;

ConcertDescription.displayName = 'Concert Description';
Card.ConcertDescprtion = ConcertDescription;
