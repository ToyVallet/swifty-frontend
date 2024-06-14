'use client';

import { useState } from "react";
import {
  ConcertUpdateForm,
  DrawerButton,
  StatusNotifier,
} from '@components/festival';
import formatDate from '@lib/util/formatDate';
import type { ConcertStatus, ConcertsResponse } from "@app/types/concert";
import type { PropsWithClassName } from '@swifty/shared-lib';
import clsx from "clsx";

import styles from './panel.module.css';
import { useConcertStatusToggle } from "@app/hooks/festival";

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
}: ConcertsResponse & { festivalSubId: string } & PropsWithClassName) {
  const [isLock, setIsLock] = useState<boolean>(true);
  const toggleLock = () => { setIsLock(prev => !prev) }
  const lock = () => { setIsLock(true) }
  const { optimisticConcertStatus, open, hidden } = useConcertStatusToggle(subId, concertStatus);

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
            concertStatus={optimisticConcertStatus}
            isLock={isLock}
            toggleLock={toggleLock}
            open={open}
            hidden={hidden}
          />
        </DrawerButton>
      </div>
    </li>
  );
}
