'use client';

import { Button, GlobalPortal } from '@swifty/ui';
import type { ForwardRefExoticComponent } from 'react';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

type Props = Omit<ComponentPropsWithoutRef<typeof Button>, 'block'>;

const FixedBottomCTA: ForwardRefExoticComponent<Props> = forwardRef<
  React.ElementRef<typeof Button>,
  Props
>((props, ref) => {
  return (
    <GlobalPortal.Consumer>
      <div className="fixed bottom-0 right-0 left-0 mx-auto max-w-[640px] dark:bg-black rounded-t-xl dark:shadow-[0_-40px_50px_0px_rgba(0,0,0,0.6)]">
        <div className="p-[0_20px_18px] mx-auto">
          <Button
            block
            type={props.type ?? 'button'}
            variant="primary"
            ref={ref}
            data-testid="cta"
            {...props}
          />
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
});
FixedBottomCTA.displayName = 'FixedBottomCTA';

export default FixedBottomCTA;
