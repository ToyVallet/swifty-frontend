import { ModelStoreProvider } from '@store';
import { cn } from '@swifty/shared-lib';
import { Provider } from '@swifty/ui';
import '@swifty/ui/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '스위프티 - 전국 대학 축제 종합 플랫폼 - TICKET',
  description: '스위프티 - 전국 대학 축제 종합 플랫폼',
  applicationName: '스위프티 - TICKET',
  keywords: [],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '스위프티',
    description: '스위프티 - 전국 대학 축제 종합 플랫폼',
    url: 'https://ticket.swifty.kr',
    siteName: 'swifty-ticket',
    images: [
      {
        url: 'https://www.swifty.kr/opengraph-image.png',
      },
    ],
  },
  metadataBase: new URL('/', 'https://swifty.kr'),
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'w-dvw h-dvh')}>
        <Provider>
          <ModelStoreProvider>{children}</ModelStoreProvider>
        </Provider>
      </body>
    </html>
  );
}
