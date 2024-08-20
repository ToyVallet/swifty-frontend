import type { PropsWithClassName } from '@swifty/shared-lib';
import { cn } from '@swifty/shared-lib';

export default function Title({ children, className }: PropsWithClassName) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center text-26 font-bold text-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
