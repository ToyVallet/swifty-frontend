import { cn } from '@swifty/shared-lib';
import { type PropsWithChildren } from 'react';

export default function Header({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h3 className={cn('py-5 text-20 font-bold', className)}>{children}</h3>
  );
}
