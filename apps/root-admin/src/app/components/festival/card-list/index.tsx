import clsx from 'clsx';

import styles from './card-list.module.css';

export default function CardList({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <ul className={clsx(styles.cardList, className)}>{children}</ul>;
}
