import { cn } from '@swifty/shared-lib';
import type { ComponentPropsWithoutRef } from 'react';

export default function FadeOverlay({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'absolute max-h-[265px] h-full bottom-0 left-0 right-0 opacity-100 bg-gradient-to-t from-[#001235] to-transparent',
        className,
      )}
      {...props}
    />
  );
}
