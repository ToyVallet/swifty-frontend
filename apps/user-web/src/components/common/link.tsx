'use client';

import { cn } from '@swifty/shared-lib';
import { default as NextLink } from 'next/link';
import type { ComponentProps } from 'react';

export default function Link({
  children,
  href,
  className,
  ...props
}: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      href={href}
      className={cn(
        'w-full h-full flex justify-center items-center',
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
