import { type PropsWithChildren } from 'react';

//import { headers } from 'next/headers';

export default function MyPageLayout({ children }: PropsWithChildren) {
  /*   const headersList = headers();
  const path = headersList.get('x-pathname') || ''; */

  return <>{children}</>;
}
