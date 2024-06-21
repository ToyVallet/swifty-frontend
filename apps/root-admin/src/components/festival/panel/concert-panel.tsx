'use client';

import { ConcertUpdateForm, DrawerButton, StatusNotifier } from '@components';
import { formatDate } from '@lib';
import type { PropsWithClassName } from '@swifty/shared-lib';
import type { ConcertsResponse } from '@type';
import { Button } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './panel.module.css';

interface Props extends ConcertsResponse, PropsWithClassName {
  festivalSubId: string;
}

export default function ConcertPanel({
  className,
  festivalSubId,
  subId,
  name,
  location,
  startDate,
  endDate,
  description,
  concertStatus,
}: Props) {
  return (
    <li className={clsx(styles.description, className)}>
      <h3 className={styles.heading}>{`${name}`}</h3>
      <span className={styles.content}>{`${location}`}</span>
      <span className={styles.content}>{description}</span>
      <span className={styles.content}>
        {`${formatDate(startDate)} - ${formatDate(endDate)}`}
      </span>

      <div className={styles.content}>
        <StatusNotifier status={concertStatus} />
      </div>
      <div>
        <Button>
          <Link href={`/festivals/${festivalSubId}/${subId}`}>
            콘서트 상세 정보
          </Link>
        </Button>
      </div>
      <div className={styles.content}>
        <DrawerButton variant="concert-update">
          <ConcertUpdateForm
            festivalId={festivalSubId}
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
    </li>
  );
}
