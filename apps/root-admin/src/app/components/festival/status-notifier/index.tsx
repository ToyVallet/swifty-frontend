import clsx from "clsx";
import styles from "./status-notifier.module.css";

export default function StatusNotifier({
  className,
  status,
}: { className?: string, status: 'HIDDEN' | 'OPEN' }) {
  return (
    <>
      <div className={clsx(styles.notifier, className,
        {
          [styles.hidden as string]: status === 'HIDDEN',
          [styles.open as string]: status === 'OPEN',
        })}>
        {status === 'OPEN' && 'Open'}
        {status === 'HIDDEN' && 'Hidden'}
      </div>
    </>
  )
}
