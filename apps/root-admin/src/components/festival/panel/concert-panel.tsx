'use client';

import { ConcertUpdateForm, DrawerButton, StatusNotifier } from '@components';
import { formatDateRange } from '@swifty/shared-lib';
import type { PropsWithClassName } from '@swifty/shared-lib';
import type { ConcertsResponse } from '@type';
import { Button } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './panel.module.css';

interface Props extends ConcertsResponse, PropsWithClassName {
  festivalId: string;
}

export default function ConcertPanel({
  className,
  festivalId,
  id,
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
        {formatDateRange(startDate, endDate)}
      </span>

      <div className={styles.content}>
        <StatusNotifier status={concertStatus} />
      </div>
      <div>
        <Button>
          <Link href={`/festivals/${festivalId}/${id}`}>콘서트 상세 정보</Link>
        </Button>
      </div>
      <div className={styles.content}>
        <DrawerButton variant="concert-update">
          <ConcertUpdateForm
            festivalId={festivalId}
            id={id}
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
