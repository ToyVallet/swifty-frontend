import { Main, Navigation } from '@components/common';
import {
  ScheduleSection,
  UserBar,
  UserSection,
  VerificationSection,
} from '@components/mypage';

export default function MyPage() {
  return (
    <>
      <Navigation title="마이 페이지" variant="back" bg="blur" />
      <Main className="gap-5 pb-32 px-5">
        <UserBar username="사용자" />
        <ScheduleSection />
        <VerificationSection />
        <UserSection />
      </Main>
    </>
  );
}
