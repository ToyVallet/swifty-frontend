import { Params } from '@lib/types';
import type { Metadata, Viewport } from 'next';
import { PropsWithChildren } from 'react';

import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Swifty',
  description: '전국 대학 축제 종합 솔루션, 스위프티 입니다.',
  manifest: '/manifest.json',
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: 'Swifty',
    description: '전국 대학 축제 종합 솔루션, 스위프티 입니다.',
    url: 'https://swifty-festival.vercel.app',
    siteName: 'Swifty',
    images: [
      {
        url: 'https://swifty-festival.vercel.app/opengraph-image.png',
      },
    ],
  },
  metadataBase: new URL('/', 'https://swifty-festival.vercel.app'),
};

export const viewport: Viewport = {
  themeColor: '#0c0c0c',
  // [
  // { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  // { media: '(prefers-color-scheme: dark)', color: '#0c0c0c' },
  // ],
};

export default function RootLayout({
  children,
  params: { locale },
}: PropsWithChildren<Params<{ locale: string }>>) {

  return (
    <html lang={locale ?? 'ko'}>
      <body className="font-Pretendard">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
