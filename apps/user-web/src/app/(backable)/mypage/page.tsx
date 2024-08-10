import { Main, Navigation } from '@components/common';
import {
  ScheduleSection,
  UserBar,
  UserSection,
  VerificationSection,
} from '@components/mypage';
import type { UserInfoApi } from '@lib/types';
import { http } from '@swifty/shared-lib';
import { Suspense } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

export default async function MyPage() {
  const user = await http.get<UserInfoApi>('/user');
  return (
    <>
      <Navigation title="마이 페이지" bg="blur" />
      <Main className="gap-5 pb-32 px-5">
        <UserBar username={user.name || '사용자'} />
        <Suspense fallback={<PulseLoader />}>
          <ScheduleSection />
        </Suspense>
        <VerificationSection />
        <UserSection />
      </Main>
    </>
  );
}
