import { ChangePhoneNumberForm } from '@components/change-phone-number';
import { Main, Navigation } from '@components/common';
import { Header } from '@components/signup';
import { API_USER } from '@lib/constants';
import type { UserInfoApi } from '@lib/types';
import { customFetch } from '@swifty/shared-lib';

export default async function Page() {
  const user = await customFetch<UserInfoApi>(API_USER.info, {
    method: 'get',
    next: {
      tags: ['user'],
    },
  });

  return (
    <>
      <Navigation variant="back" title="휴대폰 번호 변경" />
      <Main className="w-full px-5">
        <Header>
          변경할 휴대폰 번호를 입력해주세요
          <span className="text-14 font-medium">{`현재 등록된 번호: ${user.phoneNumber}`}</span>
        </Header>
        <ChangePhoneNumberForm />
      </Main>
    </>
  );
}
