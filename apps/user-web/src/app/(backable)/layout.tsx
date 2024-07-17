import type { PropsWithChildren } from 'react';

export default function BackableLayout({ children }: PropsWithChildren) {
  return <div className="pt-[50px] pb-10 px-5 h-dvh">{children}</div>;
}
