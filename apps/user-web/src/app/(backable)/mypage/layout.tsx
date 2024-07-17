import { Navigation } from '@components/common';
import { type PropsWithChildren } from 'react';

export default function SearchLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation variant="back" title="마이페이지" bg="blur" />
      {children}
    </>
  );
}
