'use client';

import { getOS } from '@swifty/shared-lib';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function IsMobile({ url = '/mypage' }: { url?: string }) {
  const router = useRouter();
  const type = getOS();

  useEffect(() => {
    if (type === 'server' || type === 'desktop') {
      router.push(url);
    }
  }, []);

  return <div></div>;
}
