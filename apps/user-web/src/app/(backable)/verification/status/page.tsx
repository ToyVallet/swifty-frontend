import { Navigation } from '@components/common';
import { VerificationStatus } from '@components/verification';
import { customFetch } from '@swifty/shared-lib';

export default async function Page() {
  // status 상태 받아오기

  //const data = await customFetch('/certifivation/certification/check');

  return (
    <>
      <Navigation variant="back" title="재학생 인증 상태" />
      <VerificationStatus step="APPROVED" />
    </>
  );
}
