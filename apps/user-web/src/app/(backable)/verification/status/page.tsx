import { Navigation } from '@components/common';
import { VerificationStatus } from '@components/verification';
import type { UserInfoApi } from '@lib/types';
import type { VerficationAPI } from '@lib/types/certification';
import { http } from '@swifty/shared-lib';

export default async function Page() {
  const data = await http.get<VerficationAPI>('/certification/check', {
    credentials: 'include',
  });

  const { universityName } = await http.get<UserInfoApi>('/user', {
    credentials: 'include',
  });

  return (
    <div className="px-5">
      <Navigation title="재학생 인증 상태" bg="blur" />
      <VerificationStatus
        step={data.certificationStatus}
        message={data.rejectedReason}
        universityName={universityName}
      />
    </div>
  );
}
