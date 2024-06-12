import { Navigation } from '@components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'swifty admin',
  description: 'swifty 어드민 관리자 페이지입니다.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navigation>{children}</Navigation>
    </div>
  );
}
