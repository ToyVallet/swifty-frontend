'use client';

import { cn } from '@swifty/shared-lib';
import { Button } from '@swifty/ui';
import type { ForwardRefExoticComponent } from 'react';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { GlobalPortal } from '../../app/global-portal';

type Props = ComponentPropsWithoutRef<typeof Button> & {
  shadow?: boolean;
};

const FixedBottomCTA: ForwardRefExoticComponent<Props> = forwardRef<
  React.ElementRef<typeof Button>,
  Props
>(({ className, shadow = true, ...props }, ref) => {
  return (
    <GlobalPortal.Consumer>
      <div
        className={cn(
          'fixed left-0 bottom-0 w-full bg-black rounded-t-xl',
          className,
          shadow && 'shadow-[0_-40px_50px_0px_rgba(0,0,0,0.6)]',
        )}
      >
        <div className="p-[0_20px_18px]">
          <Button size="full" {...props} ref={ref} data-testid="cta" />
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
});
FixedBottomCTA.displayName = 'FixedBottomCTA';

export default FixedBottomCTA;
