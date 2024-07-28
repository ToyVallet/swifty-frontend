import { Main, Navigation } from '@components/common';
import {
  ScheduleSection,
  UserBar,
  UserSection,
  VerificationSection,
} from '@components/mypage';
import type { UserInfoApi } from '@lib/types';
import { http } from '@swifty/shared-lib';

export default async function MyPage() {
  const user = await http.get<UserInfoApi>('/user');
  return (
    <>
      <Navigation title="마이 페이지" bg="blur" />
      <Main className="gap-5 pb-32 px-5">
        <UserBar username={user.name || '사용자'} />
        <ScheduleSection />
        <VerificationSection />
        <UserSection />
      </Main>
    </>
  );
}
