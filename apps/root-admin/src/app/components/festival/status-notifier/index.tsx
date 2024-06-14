import clsx from "clsx";
import type { PropsWithClassName } from "@swifty/shared-lib";
import type { ConcertStatus } from "@app/types/concert";

import styles from "./status-notifier.module.css";

export default function StatusNotifier({
  className,
  isPale = false,
  status,
}: { status: 'OPENED' | 'HIDDEN'; isPale?: boolean } & PropsWithClassName) {
  return (
    <>
      <div className={clsx(styles.notifier,
        {
          [styles.hidden as string]: status === 'HIDDEN',
          [styles.open as string]: status === 'OPENED',
          [styles.pale as string]: isPale,
        }, className)}>
        {status === 'OPENED' && 'Opened'}
        {status === 'HIDDEN' && 'Hidden'}
      </div>
    </>
  )
}
