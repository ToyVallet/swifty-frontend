'use client';

import type { PropsWithChildren } from 'react';

import { GlobalPortal } from '../../app/global-portal';

export default function FixedBottomCTAGroup({ children }: PropsWithChildren) {
  return (
    <GlobalPortal.Consumer>
      <div className="fixed left-0 bottom-0 w-full bg-black rounded-t-xl shadow-[0_-40px_50px_0px_rgba(0,0,0,0.6)]">
        <div className="p-[0_20px_18px] flex flex-col gap-2.5">{children}</div>
      </div>
    </GlobalPortal.Consumer>
  );
}
