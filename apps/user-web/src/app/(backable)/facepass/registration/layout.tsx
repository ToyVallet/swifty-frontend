import { Navigation } from '@components/common';
import { type PropsWithChildren } from 'react';

export default function FacepassLayout({ children }: PropsWithChildren) {
  return (
    <div className="px-5 w-full h-full bg-swifty-color-dark-bg">
      <Navigation title="돌아가기" bg="white" />
      {children}
    </div>
  );
}
