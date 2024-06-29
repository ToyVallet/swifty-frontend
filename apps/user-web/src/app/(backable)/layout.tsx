import type { PropsWithChildren } from 'react';

export default function BackableLayout({ children }: PropsWithChildren) {
  return <main className="pt-[50px] px-5">{children}</main>;
}
