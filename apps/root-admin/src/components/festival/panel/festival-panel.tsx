import { formatDate } from '@swifty/shared-lib';
import type { PropsWithClassName } from '@swifty/shared-lib';
import type { FestivalInfoResponse } from '@type';
import clsx from 'clsx';

import styles from './panel.module.css';

type Props = FestivalInfoResponse & PropsWithClassName;

export default function FestivalPanel({
  className,
  name,
  addr,
  description,
  startDate,
  endDate,
}: Props) {
  return (
    <li className={clsx(styles.description, className)}>
      <h3 className={styles.heading}>{name}</h3>
      <span className={styles.content}>{addr}</span>
      <span className={styles.content}>{description}</span>
      <span className={styles.content}>
        {formatDate(new Date(startDate), 'YYYY년 MM월 DD일')}
      </span>
      <span className={styles.content}>
        {formatDate(new Date(endDate), 'YYYY년 MM월 DD일')}
      </span>
    </li>
  );
}
