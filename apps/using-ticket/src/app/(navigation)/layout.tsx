import { Main } from '@components';
import type { PropsWithChildren } from 'react';

export default function NavigationLayout({ children }: PropsWithChildren) {
  return <Main>{children}</Main>;
}
