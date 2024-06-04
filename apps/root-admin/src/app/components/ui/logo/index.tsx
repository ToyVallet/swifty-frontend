import Link from "next/link";
import LogoIcon from "/public/icons/swifty-logo.svg";
import LogoSmallIcon from "/public/icons/swifty-logo-small.svg";
import clsx from "clsx";
import styles from "./logo.module.css";

export default function Logo({
  variant = 'default',
  className
}: { variant?: 'small' | 'default', className?: string }) {
  return (
    <Link href="#" className={clsx(styles.link, className)}>
      <h1 className={styles.srOnly}>swifty root</h1>
      {variant === 'small' && <LogoSmallIcon />}
      {variant === 'default' && <LogoIcon className={styles.logo} />}
    </Link>
  )
}
