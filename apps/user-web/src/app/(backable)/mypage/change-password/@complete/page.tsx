'use client';

import { FixedBottomGroup } from '@components/common';
import ChangePassowrd from '@images/change-password/change-password.gif';
import { logout } from '@swifty/shared-lib';
import { Button } from '@swifty/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { push } = useRouter();

  return (
    <section>
      <Image
        className="m-[152px_auto_159px_auto]"
        src={ChangePassowrd}
        alt="비밀번호 변경 완료"
        width={255}
        height={255}
      />
      <FixedBottomGroup className="gap-2.5">
        <Button
          block
          variant="white"
          onClick={() => logout().then(() => push('/login'))}
        >
          로그인하기
        </Button>
        <Button
          block
          variant="primary"
          onClick={() => logout().then(() => push('/'))}
        >
          홈으로 가기
        </Button>
      </FixedBottomGroup>
    </section>
  );
}
