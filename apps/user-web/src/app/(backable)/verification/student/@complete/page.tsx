import { FixedBottomGroup } from '@components/common';
import Check from '@images/signup/complete-check.gif';
import { Button } from '@swifty/ui';
import Image from 'next/image';
import Link from 'next/link';

export default function CertificationCompletePage() {
  return (
    <>
      <section className="overflow-hidden scrollbar-hide">
        <div className="text-center">
          <span className="text-14 font-medium">
            빠른 입장을 위한 안면등록을 진행 하시겠습니까?
          </span>
        </div>
        <Image
          className="m-[86px_auto_134px_auto]"
          src={Check}
          alt="회원가입이 완료되었어요"
          width={255}
          height={255}
        />
        <div className="text-center">
          <span className="text-14 font-medium">
            학적 인증 요청 후 N시간 내로 승인 여부가 결정됩니다.<br></br> 승인
            여부는 마이페이지에서 확인 가능합니다.
          </span>
        </div>
      </section>
      <FixedBottomGroup className="gap-2.5">
        <Button block variant="white" asChild>
          <Link href="/">홈으로</Link>
        </Button>
        <Button block variant="primary" asChild>
          <Link href="#">안면 인증 등록</Link>
        </Button>
      </FixedBottomGroup>
    </>
  );
}
