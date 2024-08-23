import { Provider } from '@swifty/ui';
import '@swifty/ui/styles.css';
import type { Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className="font-Pretendard scrollbar-hide bg-swifty-color-100 dark:bg-swifty-color-dark-bg">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
