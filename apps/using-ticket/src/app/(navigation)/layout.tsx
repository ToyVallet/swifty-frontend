import { Footer, Main, Navigation } from '@components';
import type { PropsWithChildren } from 'react';

export default function NavigationLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
