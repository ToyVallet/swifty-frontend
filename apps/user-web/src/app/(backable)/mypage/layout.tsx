import type { ReactNode } from 'react';
import { type PropsWithChildren } from 'react';

export default function MyPageLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  return (
    <div className="pt-[50px]">
      {children}
      {modal}
    </div>
  );
}
