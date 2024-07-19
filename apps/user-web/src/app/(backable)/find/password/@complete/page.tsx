import { FixedBottomGroup } from '@components/common';
import ChangePassword from '@images/change-password/change-password.gif';
import { Button } from '@swifty/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <Image
        className="m-[152px_auto_159px_auto]"
        src={ChangePassword}
        alt="비밀번호 변경 완료"
        width={255}
        height={255}
      />
      <FixedBottomGroup className="flex flex-col gap-2.5">
        <Button size="full" variant="white" asChild>
          <Link href="/login">로그인하기</Link>
        </Button>
        <Button size="full" asChild>
          <Link href="/">홈으로 가기</Link>
        </Button>
      </FixedBottomGroup>
    </div>
  );
}
