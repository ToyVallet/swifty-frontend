import type { PropsWithChildren } from 'react';

export default function BackableLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-dvh bg-swifty-color-100 dark:bg-swifty-color-dark-bg">
      {children}
    </div>
  );
}
