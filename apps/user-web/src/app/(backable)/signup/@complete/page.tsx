'use client';

import { FixedBottomCTA } from '@components/common';
import Check from '@images/signup/complete-check.gif';
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

      <FixedBottomCTA
        type="button"
        onClick={() => {}}
        size="full"
        variant="white"
        className="bottom-[60px]"
      >
        등록 없이 완료
      </FixedBottomCTA>
      <FixedBottomCTA
        type="button"
        onClick={() => {}}
        size="full"
        shadow={false}
      >
        학적 인증
      </FixedBottomCTA>
    </section>
  );
}
