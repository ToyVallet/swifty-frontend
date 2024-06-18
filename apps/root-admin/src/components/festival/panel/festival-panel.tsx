import { formatDate } from '@lib';
import type { PropsWithClassName } from '@swifty/shared-lib';
import clsx from 'clsx';

import styles from './panel.module.css';

export default function FestivalPanel({
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
    <li className={clsx(styles.description, className)}>
      <h3 className={styles.heading}>{name}</h3>
      <span className={styles.content}>{addr}</span>
      <span className={styles.content}>{description}</span>
      <span className={styles.content}>{formatDate(startDate)}</span>
      <span className={styles.content}>{formatDate(endDate)}</span>
    </li>
  );
}
