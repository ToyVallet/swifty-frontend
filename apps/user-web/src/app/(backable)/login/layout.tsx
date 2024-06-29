import { Navigation } from '@components/common';
import { type PropsWithChildren } from 'react';

export default function SearchLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation variant="back" title="로그인" />
      {children}
    </>
  );
}
