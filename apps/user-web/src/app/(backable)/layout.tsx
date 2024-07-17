import type { PropsWithChildren } from 'react';

export default function BackableLayout({ children }: PropsWithChildren) {
  return <div className="pt-[50px] pb-10 h-dvh">{children}</div>;
}
