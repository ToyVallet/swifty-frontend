import type { PropsWithChildren } from 'react';

export default function LocaleLayout({ children }: PropsWithChildren) {
  return (
    <div className="max-w-[430px] min-w-[320px] m-auto h-[100dvh] overflow-x-hidden scrollbar-hide relative bg-bgBlack">
      {children}
    </div>
  );
}
