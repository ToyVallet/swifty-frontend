'use client';

import { Toast } from '@swifty/ui';
import NextTopLoader from 'nextjs-toploader';
import { type PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <NextTopLoader color="#0262E9" showSpinner={false} shadow={false} />
      <Toast position="top-center" />
      {children}
    </>
  );
}
