import { Main, Navigation } from '@components/common';
import { ChangePhoneNumberForm } from '@components/mypage';
import { Header } from '@components/signup';
import type { UserInfoApi } from '@lib/types';
import { http } from '@swifty/shared-lib';

export default async function Page() {
  const user = await http.get<UserInfoApi>('/user');

  return (
    <>
      <Navigation title="휴대폰 번호 변경" bg="blur" />
      <Main className="w-full px-5 mt-[47px]">
        <Header>
          변경할 휴대폰 번호를 입력해주세요
          <span className="text-14 font-medium">{`현재 등록된 번호: ${user.phoneNumber}`}</span>
        </Header>
        <ChangePhoneNumberForm />
      </Main>
    </>
  );
}
