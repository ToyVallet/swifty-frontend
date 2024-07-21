'use client';

import { DeleteUserContext } from '@app/(backable)/mypage/delete/context';
import { FixedBottomCTA } from '@components/common';
import { API_USER } from '@lib/constants';
import { customFetch } from '@swifty/shared-lib';
import { Input } from '@swifty/ui';
import { convertNewlineToJSX } from '@toss/react';
import { useContext, useState } from 'react';

const CONFIRM_MESSAGE = '확인했습니다';

export default function Page() {
  const [value, setValue] = useState('');
  const { nextStep } = useContext(DeleteUserContext);

  const onClick = async () => {
    try {
      await customFetch(API_USER.delete, {
        method: 'DELETE',
        credentials: 'include',
      });

      nextStep();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex flex-col w-full gap-5 mt-10">
      <section className="bg-swifty-color-800 rounded-xl p-5 text-16 font-medium text-white text-center">
        {convertNewlineToJSX(
          '회원 탈퇴시 예매한 모든 티켓이 삭제됩니다.\n동의 하고 탈퇴를 원하실 경우 아래에\n "확인했습니다"를 입혁해주세요',
        )}
      </section>
      <Input
        label="입력"
        placeholder={CONFIRM_MESSAGE}
        name="user-delte-confirm"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <FixedBottomCTA
        variant={value === CONFIRM_MESSAGE ? 'default' : 'white'}
        disabled={value !== CONFIRM_MESSAGE}
        onClick={onClick}
      >
        확인
      </FixedBottomCTA>
    </div>
  );
}
