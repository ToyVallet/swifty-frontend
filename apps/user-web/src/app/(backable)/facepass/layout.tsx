import { Navigation } from '@components/common';
import { type PropsWithChildren } from 'react';

export default function FacepassLayout({ children }: PropsWithChildren) {
  return (
    <div className="px-5 w-full h-full overflow-hidden">
      <Navigation title="돌아가기" bg="transparent" />
      {children}
    </div>
  );
}
