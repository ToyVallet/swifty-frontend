import { type PropsWithChildren } from 'react';

export default function MyPageLayout({ children }: PropsWithChildren) {
  return <div className="pt-[50px]">{children}</div>;
}
