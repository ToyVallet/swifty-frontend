'use client';

import type { ReactElement } from 'react';

import { GlobalPortal } from '../../app/global-portal';

type Props = {
  buttons: ReactElement[];
};

export default function FixedBottomCTAGroup({ buttons }: Props) {
  return (
    <GlobalPortal.Consumer>
      <div className="fixed left-0 bottom-0 w-full bg-black rounded-t-xl shadow-[0_-40px_50px_0px_rgba(0,0,0,0.6)]">
        <div className="p-[0_20px_18px] flex flex-col gap-2.5">
          {buttons.map((button, index) => (
            <div key={index}>{button}</div>
          ))}
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
}
