import type { PropsWithClassName } from '@swifty/shared-lib';
import clsx from 'clsx';

import styles from './panel.module.css';

export default function PanelList({ className, children }: PropsWithClassName) {
  return <ul className={clsx(styles.panelList, className)}>{children}</ul>;
}
