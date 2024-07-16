import { FixedBottomCTA } from '@components/common';
import { Header } from '@components/signup';
import { API_SIGNUP } from '@lib/constants';
import type { UserInfoApi } from '@lib/types';
import { customFetch } from '@swifty/shared-lib';
import Link from 'next/link';

export default async function CompleteChangePhoneNumberPage() {
  const user = await customFetch<UserInfoApi>(API_SIGNUP.user, {
    method: 'get',
    next: {
      tags: ['user'],
    },
  });
  return (
    <>
      <Header>
        휴대폰 번호가 변경되었습니다.
        <h1>{`현재 등록된 번호: ${user.phoneNumber}`}</h1>
      </Header>
      <FixedBottomCTA>
        <Link href="/">홈으로</Link>
      </FixedBottomCTA>
    </>
  );
}
