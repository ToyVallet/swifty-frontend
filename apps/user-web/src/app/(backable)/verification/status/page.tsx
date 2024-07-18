import { Navigation } from '@components/common';
import { VerificationStatus } from '@components/verification';

export default async function Page() {
  // status 상태 받아오기
  return (
    <>
      <Navigation variant="back" title="재학생 인증 상태" />
      <VerificationStatus />
    </>
  );
}
