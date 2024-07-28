import type { PropsWithChildren } from 'react';

export default function BackableLayout({ children }: PropsWithChildren) {
  return (
    <div className="pb-10 h-dvh bg-swifty-color-100 dark:bg-swifty-color-dark-bg">
      {children}
    </div>
  );
}
