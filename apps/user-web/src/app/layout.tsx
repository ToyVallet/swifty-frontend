import { ThemeProvider } from '@components/provider/theme-provider';
import { Provider } from '@swifty/ui';
import '@swifty/ui/styles.css';
import type { Metadata } from 'next';
import type { Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: '스위프티 - 전국 대학 축제 종합 플랫폼',
  description: '스위프티 - 전국 대학 축제 종합 플랫폼',
  applicationName: '스위프티',
  keywords: [],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '스위프티',
    description: '스위프티 - 전국 대학 축제 종합 플랫폼',
    url: 'https://swifty.kr',
    siteName: '단페스타 2024',
    images: [
      {
        url: 'https://www.swifty.kr/opengraph-image.png',
      },
    ],
  },
  metadataBase: new URL('/', 'https://www.swifty.kr'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

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
      <body className="font-Pretendard scrollbar-hide bg-swifty-color-100 dark:bg-swifty-color-dark-bg text-black dark:text-white mx-auto max-w-[640px] relative">
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
