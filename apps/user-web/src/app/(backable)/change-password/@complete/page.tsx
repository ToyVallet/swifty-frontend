'use client';

import { FixedBottomGroup } from '@components/common';
import ChangePassowrd from '@images/change-password/change-password.gif';
import { COOKIE_KEYS, deleteCookie } from '@swifty/shared-lib';
import { Button } from '@swifty/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const onClick = async (path: string) => {
    await deleteCookie(COOKIE_KEYS.accessToken);
    await deleteCookie(COOKIE_KEYS.refreshToken);
    router.replace(path);
  };
  return (
    <section>
      <Image
        className="m-[152px_auto_159px_auto]"
        src={ChangePassowrd}
        alt="회원가입이 완료되었어요"
        width={255}
        height={255}
      />
      <FixedBottomGroup className="gap-2.5">
        <Button
          size="full"
          variant="white"
          onClick={() => {
            onClick('/login');
          }}
        >
          로그인하기
        </Button>
        <Button
          size="full"
          onClick={() => {
            onClick('/');
          }}
        >
          홈으로 가기
        </Button>
      </FixedBottomGroup>
    </section>
  );
}
