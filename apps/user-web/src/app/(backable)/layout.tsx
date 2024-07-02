import type { PropsWithChildren } from 'react';

export default function BackableLayout({ children }: PropsWithChildren) {
  return <main className="pt-[50px] pb-10 px-5 h-dvh">{children}</main>;
}
