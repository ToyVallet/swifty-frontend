'use client';

import { Link, Navigation } from '@components/common';
import Caution from '@icons/caution.svg';
import { Button } from '@swifty/ui';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <html>
      <body>
        <Navigation variant="back" />
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center px-5 gap-5">
          <Caution className="h-32" />
          <h2 className="text-18 font-semibold text-white text-center">
            죄송합니다.
            <br />
            요청하신 페이지를 찾을 수 없습니다.
          </h2>
          <p className="text-14 font-[400] text-white text-center mb-5">
            주소가 잘못 입력되었거나, 변경 혹은 삭제되어
            <br />
            요청하신 페이지를 찾을 수 없습니다.
            <br />
            입력하신 주소가 정확한지 다시 한번 확인해 주세요.
          </p>

          <Button asChild size="full" variant="outlined">
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </body>
    </html>
  );
}
