import { Navigation } from '@components/common';
import { VerificationStatus } from '@components/verification';

export default async function Page() {
  // status 상태 받아오기

  //const data = await customFetch('/certifivation/certification/check');

  return (
    <>
      <Navigation title="재학생 인증 상태" />
      <VerificationStatus step="APPROVED" />
    </>
  );
}
