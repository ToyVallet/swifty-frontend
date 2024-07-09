'use client';

import { FixedBottomCTA } from '@components/common';
import Check from '@images/signup/complete-check.gif';
import { Button } from '@swifty/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupCompletePage() {
  return (
    <>
      <Image
        className="m-[86px_auto_134px_auto]"
        src={Check}
        alt="회원가입이 완료되었어요"
        width={255}
        height={255}
      />
      <span className="text-14 font-medium text-white mx-auto">
        대학 축제 티켓팅 기능은 학적 인증이 필요합니다.
      </span>
      {/* <BottomContainer>
        <Button className="mb-[10px]" variant="white" size="full" asChild>
          <Link href="/">등록 없이 완료</Link>
        </Button>
        <Button variant="default" size="full" asChild>
          <Link href="/signup/identification">학적 인증하기</Link>
        </Button>
      </BottomContainer> */}
      <FixedBottomCTA type="button" onClick={() => {}} />
    </>
  );
}
