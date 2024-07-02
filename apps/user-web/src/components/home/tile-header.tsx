import { cn } from '@swifty/shared-lib';
import type { PropsWithChildren } from 'react';

export default function TileHeader({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'w-full flex justify-between items-end lg:max-w-full lg:w-full',
        className,
      )}
    >
      <h3 className="text-22 font-bold">{children}</h3>
    </div>
  );
}
