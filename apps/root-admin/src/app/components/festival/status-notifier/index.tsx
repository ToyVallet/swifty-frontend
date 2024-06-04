import clsx from "clsx";
import styles from "./status-notifier.module.css";

export default function StatusNotifier({
  className,
  status,
}: { className?: string, status: 'BEFORE' | 'PROCESS' | 'CLOSED' }) {
  return (
    <>
      <div className={clsx(styles.notifier, className,
        {
          [styles.before]: status === 'BEFORE',
          [styles.pending]: status === 'PROCESS',
          [styles.end]: status === 'CLOSED',
        })}>
        {status === 'BEFORE' && 'Before'}
        {status === 'PROCESS' && 'Process'}
        {status === 'CLOSED' && 'Closed'}
      </div>
    </>
  )
}
