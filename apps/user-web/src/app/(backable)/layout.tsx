import type { PropsWithChildren } from 'react';

export default function BackableLayout({ children }: PropsWithChildren) {
  return <div className="pb-10 h-dvh">{children}</div>;
}
