'use client';

import { Button } from '@swifty/ui';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { GlobalPortal } from '../../app/global-portal';

const FixedBottomCTA = forwardRef<
  React.ElementRef<typeof Button>,
  ComponentPropsWithoutRef<typeof Button>
>((props, ref) => {
  return (
    <GlobalPortal.Consumer>
      <div className="fixed left-0 bottom-0 w-full bg-black rounded-t-xl shadow-[0_-40px_50px_0px_rgba(0,0,0,0.6)]">
        <div className="p-[0_20px_18px]">
          <Button size="full" {...props} ref={ref} data-testid="cta" />
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
});
FixedBottomCTA.displayName = 'FixedBottomCTA';

export default FixedBottomCTA;
