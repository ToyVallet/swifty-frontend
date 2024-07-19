import { Main, Navigation } from '@components/common';
import { UserLink } from '@components/mypage/user-section';

export default function Page() {
  return (
    <>
      <Navigation title="계정 관리" />
      <Main className="w-full px-5 items-start mt-[35px]">
        <h3 className="text-20 font-bold text-white mb-5">개인 정보 관리</h3>
        <div className="flex flex-col gap-2.5 w-full">
          <UserLink label="비밀번호 재설정" href="change-password" />
          <UserLink label="휴대폰 번호 변경" href="change-phone-number" />
        </div>
      </Main>
    </>
  );
}
