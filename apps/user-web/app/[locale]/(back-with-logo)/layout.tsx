import { Footer, Navigation } from '@/app/components/common';
import { PropsWithChildren } from 'react';

export default function BackNavLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation variant="back-with-logo" />
      {children}
      <Footer />
    </>
  );
}
