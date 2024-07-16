'use client';

import { FixedBottomCTAGroup } from '@components/common';
import Check from '@images/signup/complete-check.gif';
import { Button } from '@swifty/ui';
import { Link } from 'lucide-react';
import Image from 'next/image';

export default function SignupCompletePage() {
  return (
    <section>
      <Image
        className="m-[86px_auto_134px_auto]"
        src={Check}
        alt="회원가입이 완료되었어요"
        width={255}
        height={255}
      />
      <div className="text-center">
        <span className="text-14 font-medium text-white">
          대학 축제 티켓팅 기능은 학적 인증이 필요합니다.
        </span>
      </div>
      <FixedBottomCTAGroup
        buttons={[
          <Button size="full" variant="white">
            <Link href="/">등록 없이 완료</Link>
          </Button>,
          <Button size="full">
            <Link href="/univ-certification">학적 인증</Link>
          </Button>,
        ]}
      />
    </section>
  );
}
