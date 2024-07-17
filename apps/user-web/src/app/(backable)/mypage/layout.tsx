import { Navigation } from '@components/common';
import { headers } from 'next/headers';
import { type PropsWithChildren } from 'react';

export default function SearchLayout({ children }: PropsWithChildren) {
  const headersList = headers();
  const path = headersList.get('x-pathname') || '';

  return (
    <>
      {path.includes('info') ? (
        <Navigation variant="back" title="계정 관리" />
      ) : (
        <Navigation variant="back" title="마이페이지" />
      )}
      {children}
    </>
  );
}
