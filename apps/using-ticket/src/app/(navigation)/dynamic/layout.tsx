import { Title } from '@components';
import { convertNewlineToJSX } from '@toss/react';
import type { PropsWithChildren } from 'react';

export default function NavigationLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Title className="mb-10">
        {convertNewlineToJSX('Dynamic QR 티켓\n 입장 시스템')}
      </Title>
      {children}
    </div>
  );
}
