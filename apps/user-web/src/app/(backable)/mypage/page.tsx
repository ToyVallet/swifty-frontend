import { Main, Navigation } from '@components/common';
import {
  ScheduleSection,
  UserBar,
  UserSection,
  VerificationSection,
} from '@components/mypage';
import type { UserInfoApi } from '@lib/types';
import type { VerficationAPI } from '@lib/types/certification';
import { http } from '@swifty/shared-lib';
import { Suspense } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

export default async function MyPage() {
  const user = await http.get<UserInfoApi>('/user');
  const certification = await http.get<VerficationAPI>('/certification/check');
  return (
    <>
      <Navigation title="마이페이지" bg="blur" />
      <Main className="gap-5 pb-32 px-5">
        <UserBar username={user.name || '사용자'} />
        <Suspense fallback={<PulseLoader />}>
          <ScheduleSection />
        </Suspense>
        <VerificationSection certification={certification} user={user} />
        <UserSection />
      </Main>
    </>
  );
}
