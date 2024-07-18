'use client';

import { FixedBottomCTA } from '@components/common';
import DeleteUser from '@images/delet-user/delete-user.gif';
import { COOKIE_KEYS, deleteCookie } from '@swifty/shared-lib';
import { convertNewlineToJSX } from '@toss/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const onClick = async () => {
    await deleteCookie(COOKIE_KEYS.accessToken);
    await deleteCookie(COOKIE_KEYS.refreshToken);
    router.replace('/');
  };
  return (
    <>
      <div className="text-center mt-2.5">
        <span className="text-white text-14 font-medium">
          {convertNewlineToJSX(
            '계정을 삭제하면 학정 인증 정보, 티켓팅 내역, 관심 등 \n 모든 활동 정보가 삭제됩니다.',
          )}
        </span>
        <Image
          src={DeleteUser}
          height={250}
          width={250}
          className="m-[102px_auto_222px_auto]"
          alt="탈퇴 완료 이미지"
        />
        <FixedBottomCTA size="full" onClick={onClick}>
          홈으로 가기
        </FixedBottomCTA>
      </div>
    </>
  );
}
