import { FixedBottomGroup } from '@components/common';
import { Icon } from '@swifty/assets';
import { Button } from '@swifty/ui';
import { convertNewlineToJSX } from '@toss/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const IsMobile = dynamic(
  () => import('@components/facepass').then((mod) => mod.IsMobile),
  { ssr: false },
);

export default function FacepassCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="flex flex-col items-center justify-center text-center mt-20">
        <Icon
          name="user-web/facepass/title"
          width={165}
          height={39}
          className="fill-black dark:fill-white self-center"
        />
        <h1 className="text-center text-26 font-bold">
          안면 등록이 완료되었어요
        </h1>
      </header>
      <div className="mt-[88px] mb-10">
        <Icon
          name="user-web/facepass/logo"
          width={184}
          height={186}
          className="fill-black dark:fill-white"
        />
      </div>
      <div>
        <p className="text-14 font-medium">
          {convertNewlineToJSX(
            '등록된 사진은 안전하게 보안처리 되며,\n 이제 안면인증 티켓팅을 할 수 있어요',
          )}
        </p>
      </div>
      <FixedBottomGroup className="gap-2.5">
        <Button asChild block variant="white">
          <Link href="/mypage">마이페이지</Link>
        </Button>
        <Button asChild block variant="primary">
          <Link href="/">홈으로</Link>
        </Button>
      </FixedBottomGroup>
      <IsMobile />
    </div>
  );
}
