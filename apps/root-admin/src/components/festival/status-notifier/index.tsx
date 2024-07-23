import type { PropsWithClassName } from '@swifty/shared-lib';
import type { Status } from '@type';
import clsx from 'clsx';

import styles from './status-notifier.module.css';

export default function StatusNotifier({
  className,
  isPale = false,
  status,
}: {
  status: Status;
  isPale?: boolean;
} & PropsWithClassName) {
  return (
    <>
      <div
        className={clsx(
          styles.notifier,
          {
            [styles.hidden as string]: status === 'HIDDEN',
            [styles.open as string]: status === 'OPEN',
            [styles.pale as string]: isPale,
          },
          className,
        )}
      >
        {status === 'OPEN' && 'Open'}
        {status === 'HIDDEN' && 'Hidden'}
      </div>
    </>
  );
}
