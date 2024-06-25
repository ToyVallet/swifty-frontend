'use client';

import { Button } from 'antd';
import Link from 'next/link';
import { useEffect } from 'react';

import styles from './error.module.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className={styles.main}>
      <h2>예상치 못한 문제가 발생했습니다.</h2>
      <div className={styles.buttonSection}>
        <Button onClick={() => reset()}>Try again</Button>
        <Link href={'/'}>
          <Button>홈으로 가기</Button>
        </Link>
      </div>
    </main>
  );
}
