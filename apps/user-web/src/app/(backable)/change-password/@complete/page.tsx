import { FixedBottomGroup } from '@components/common';
import Check from '@images/signup/complete-check.gif';
import { Button } from '@swifty/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <section>
      <Image
        className="m-[86px_auto_134px_auto]"
        src={Check}
        alt="회원가입이 완료되었어요"
        width={255}
        height={255}
      />
      <FixedBottomGroup className="gap-2.5">
        <Button size="full" variant="white">
          <Link href="/login">로그인하기</Link>
        </Button>
        <Button size="full">
          <Link href="/">홈으로 가기</Link>
        </Button>
      </FixedBottomGroup>
    </section>
  );
}
