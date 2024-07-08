'use client';

import { Toast } from '@swifty/ui';
import NextTopLoader from 'nextjs-toploader';
import { type PropsWithChildren } from 'react';

import { GlobalPortal } from './global-portal';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <GlobalPortal.Provider>
      <NextTopLoader color="#0262E9" showSpinner={false} shadow={false} />
      <Toast position="top-center" />
      {children}
    </GlobalPortal.Provider>
  );
}
