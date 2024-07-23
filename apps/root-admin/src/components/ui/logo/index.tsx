import type { PropsWithClassName } from '@swifty/shared-lib';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './logo.module.css';
import LogoSmallIcon from '/public/icons/swifty-logo-small.svg';
import LogoIcon from '/public/icons/swifty-logo.svg';

export default function Logo({
  variant = 'default',
  className,
}: PropsWithClassName<{ variant?: 'small' | 'default' }>) {
  return (
    <Link href="/" className={clsx(styles.link, className)}>
      <h1 className={styles.srOnly}>swifty root</h1>
      {variant === 'small' && <LogoSmallIcon />}
      {variant === 'default' && <LogoIcon className={styles.logo} />}
    </Link>
  );
}
