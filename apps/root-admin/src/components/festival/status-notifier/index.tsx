import clsx from 'clsx';

import styles from './status-notifier.module.css';

export default function StatusNotifier({
  className,
  status,
}: {
  className?: string;
  status: 'BEFORE' | 'PROCESS' | 'CLOSED';
}) {
  return (
    <>
      <div
        className={clsx(styles.notifier, className, {
          [styles.before as string]: status === 'BEFORE',
          [styles.pending as string]: status === 'PROCESS',
          [styles.end as string]: status === 'CLOSED',
        })}
      >
        {status === 'BEFORE' && 'Before'}
        {status === 'PROCESS' && 'Process'}
        {status === 'CLOSED' && 'Closed'}
      </div>
    </>
  );
}
