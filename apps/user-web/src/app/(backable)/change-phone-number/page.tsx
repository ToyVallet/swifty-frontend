import { ChangePhoneNumberForm } from '@components/change-phone-number';
import { Navigation } from '@components/common';
import { Header } from '@components/signup';
import { API_SIGNUP } from '@lib/constants';
import type { UserInfoApi } from '@lib/types';
import { customFetch } from '@swifty/shared-lib';

export default async function Page() {
  const user = await customFetch<UserInfoApi>(API_SIGNUP.user, {
    method: 'get',
  });
  console.log(user);
  return (
    <>
      <Navigation variant="back" title="휴대폰 번호 변경" />
      <Header>
        변경할 휴대폰 번호를 입력해주세요
        <h1 className="text-14 font-medium">{`현재 등록된 번호: ${user.phoneNumber}`}</h1>
      </Header>
      <ChangePhoneNumberForm />
    </>
  );
}
