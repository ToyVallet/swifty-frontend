// import '@swifty/ui/tailwind.css';
import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: '스위프티',
  description: '스위프티 - 전국 대학 축제 종합 플랫폼',
  manifest: '/manifest.json',
  applicationName: '스위프티',
  keywords: [],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c0c' },
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className="font-Pretendard">{children}</body>
    </html>
  );
}
