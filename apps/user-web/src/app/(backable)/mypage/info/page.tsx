import { Navigation } from '@components/common';
import Header from '@components/mypage/header';
import { UserLink } from '@components/mypage/user-section';

export default function Page() {
  return (
    <>
      <Navigation variant="back" title="계정 관리" />
      <div className="w-full">
        <Header>개인 정보 관리</Header>
        <div className="flex flex-col gap-2.5">
          <UserLink label="비밀번호 재설정" href="/change-password" />
          <UserLink label="휴대폰 번호 변경" href="/change-phone-number" />
        </div>
      </div>
    </>
  );
}
