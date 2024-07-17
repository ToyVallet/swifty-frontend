'use client';

import { cn } from '@swifty/shared-lib';
import type { PropsWithChildren } from 'react';

import { GlobalPortal } from '../../app/global-portal';

export default function FixedBottomGroup({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <GlobalPortal.Consumer>
      <div className="fixed left-0 bottom-0 w-full bg-black rounded-t-xl shadow-[0_-40px_50px_0px_rgba(0,0,0,0.6)]">
        <div className={cn('p-[0_20px_18px] flex flex-col', className)}>
          {children}
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
}
