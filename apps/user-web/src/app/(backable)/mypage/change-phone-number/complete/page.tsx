import { FixedBottomCTA } from '@components/common';
import { Header } from '@components/signup';
import ChangePhoneNumber from '@images/change-phone-number/phone-number.gif';
import { API_USER } from '@lib/constants';
import type { UserInfoApi } from '@lib/types';
import { customFetch } from '@swifty/shared-lib';
import Image from 'next/image';
import Link from 'next/link';

export default async function CompleteChangePhoneNumberPage() {
  const user = await customFetch<UserInfoApi>(API_USER.info, {
    method: 'get',
    next: {
      tags: ['user'],
    },
  });
  return (
    <>
      <div className="mt-[47px]">
        <Header>
          휴대폰 번호가 변경되었습니다.
          <span className="text-14 font-medium">{`현재 등록된 번호: ${user.phoneNumber}`}</span>
        </Header>
      </div>

      <Image
        src={ChangePhoneNumber}
        className="m-[120px_auto_220px_auto]"
        alt="비밀 번호 변경 완료"
        width={255}
        height={255}
      />
      <FixedBottomCTA asChild>
        <Link href="/">홈으로</Link>
      </FixedBottomCTA>
    </>
  );
}
