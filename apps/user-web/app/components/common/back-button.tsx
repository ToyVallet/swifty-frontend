'use client';

import { cn } from '@swifty/shared-lib';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';

export default function BackButton({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={cn('w-full h-full', className)}
    >
      {children}
    </button>
  );
}
