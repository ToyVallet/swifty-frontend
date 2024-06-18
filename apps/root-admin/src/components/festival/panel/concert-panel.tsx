'use client';

import { ConcertUpdateForm, DrawerButton, StatusNotifier } from '@components';
import { formatDate } from '@lib';
import type { PropsWithClassName } from '@swifty/shared-lib';
import type { ConcertsResponse } from '@type';
import clsx from 'clsx';
import { useState } from 'react';

import styles from './panel.module.css';

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
  open,
  hide,
}: ConcertsResponse & {
  festivalSubId: string;
  open: (id: string) => Promise<void>;
  hide: (id: string) => Promise<void>;
} & PropsWithClassName) {
  const [isLock, setIsLock] = useState<boolean>(true);
  const toggleLock = () => {
    setIsLock((prev) => !prev);
  };
  const lock = () => {
    setIsLock(true);
  };

  return (
    <li className={clsx(styles.description, className)}>
      <h3 className={styles.heading}>{location}</h3>
      <span className={styles.content}>{description}</span>
      <span className={styles.content}>{formatDate(startDate)}</span>
      <span className={styles.content}>{formatDate(endDate)}</span>
      <div className={styles.content}>
        <StatusNotifier status={concertStatus} />
      </div>
      <div className={styles.content}>
        <DrawerButton variant="concert-update" isLock={isLock} lock={lock}>
          <ConcertUpdateForm
            festivalSubId={festivalSubId}
            subId={subId}
            name={name}
            location={location}
            startDate={startDate}
            endDate={endDate}
            description={description}
            concertStatus={concertStatus}
            isLock={isLock}
            toggleLock={toggleLock}
            open={open}
            hidden={hide}
          />
        </DrawerButton>
      </div>
    </li>
  );
}
