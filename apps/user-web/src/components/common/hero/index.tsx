import { cn } from '@swifty/shared-lib';
import type { PropsWithChildren } from 'react';

type HeroProps = PropsWithChildren<{
  variant?: 'carousel' | 'image';
}>;

export default function Hero({ children, variant = 'carousel' }: HeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden flex items-center justify-center',
        variant === 'carousel' ? 'h-[447px]' : 'h-[339px]',
      )}
    >
      {children}
      <div className="bg-swifty-color-100 dark:bg-swifty-color-darkBg absolute bottom-0 w-full max-h-10 h-[15%] z-10 rounded-t-[22px]" />
    </section>
  );
}
