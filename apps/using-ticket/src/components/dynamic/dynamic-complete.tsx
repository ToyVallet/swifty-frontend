'use client';

import { timer } from '@util';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DynamicComplete() {
  const router = useRouter();

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      timer(() => {
        router.push('/dynamic');
      });
    }
  }, []);
  return null;
}
