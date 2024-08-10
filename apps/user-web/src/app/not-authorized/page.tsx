'use client';

import { FixedBottomCTA, Navigation } from '@components/common';
import { Icon } from '@swifty/assets';
import Link from 'next/link';

export default function NotAuthorizedPage() {
  return (
    <>
      <Navigation title="접근 불가" />
      <div className="flex h-[100dvh] w-full flex-col items-center justify-center px-5 gap-5">
        <Icon name="user-web/500/face" height={128} />
        <h2 className="text-18 font-semibold text-center mb-5">
          해당 페이지에 접근 권한이 없습니다.
        </h2>
      </div>
      <FixedBottomCTA asChild>
        <Link href="/">홈으로</Link>
      </FixedBottomCTA>
    </>
  );
}
