'use client';

import { FixedBottomGroup } from '@components/common';
import Check from '@images/signup/complete-check.gif';
import { Button } from '@swifty/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupCompletePage() {
  return (
    <section className="overflow-hidden scroball-hide flex flex-col">
      <Image
        className="self-center my-[10%]"
        src={Check}
        alt="회원가입이 완료되었어요"
        width={255}
        height={255}
      />
      <div className="text-center">
        <span className="text-14 font-medium">
          대학 축제 티켓팅 기능은 학적 인증이 필요합니다.
        </span>
      </div>
      <FixedBottomGroup className="gap-2.5">
        <Button block variant="white" asChild>
          <Link href="/">등록 없이 완료</Link>
        </Button>
        <Button block variant="primary" asChild>
          <Link href="/verification/student">학적 인증</Link>
        </Button>
      </FixedBottomGroup>
    </section>
  );
}
