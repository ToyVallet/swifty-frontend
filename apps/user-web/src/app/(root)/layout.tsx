import { Footer, Navigation } from '@components/common';
import type { PropsWithChildren } from 'react';

export default async function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation variant="root" bg="gradient" />
      {children}
      <Footer />
    </>
  );
}
