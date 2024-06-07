import type { PropsWithClassName } from '@swifty/shared-lib';
import clsx from 'clsx';

import styles from './card-list.module.css';

export default function CardList({ className, children }: PropsWithClassName) {
  return <ul className={clsx(styles.cardList, className)}>{children}</ul>;
}
