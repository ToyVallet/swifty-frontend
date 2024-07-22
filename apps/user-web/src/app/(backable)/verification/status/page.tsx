import { Navigation } from '@components/common';
import { VerificationStatus } from '@components/verification';
import type { VerficationAPI } from '@lib/types/certification';
import { http } from '@swifty/shared-lib';

export default async function Page() {
  const data = await http.get<VerficationAPI>('/certification/check', {
    credentials: 'include',
  });

  return (
    <>
      <Navigation title="재학생 인증 상태" />
      <VerificationStatus step={data.certificationStatus} />
    </>
  );
}
