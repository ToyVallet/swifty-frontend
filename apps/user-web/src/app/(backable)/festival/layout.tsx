import { Footer, Navigation } from '@components/common';
import { type PropsWithChildren } from 'react';

export default function FestivalLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation variant="back" bg="gradient" centerLogo />
      {children}
      <Footer />
    </>
  );
}
