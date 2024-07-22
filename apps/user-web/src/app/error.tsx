'use client';

import { Navigation } from '@components/common';
import { Icon } from '@swifty/assets';
import { type NextError, sendErrorLog } from '@swifty/shared-lib';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: NextError;
  reset: () => void;
}) {
  useEffect(() => {
    sendErrorLog(error);
  }, [error]);

  return (
    <>
      <Navigation title="오류" />
      <div className="flex h-[100dvh] w-full flex-col items-center justify-center px-5 gap-5 text-white">
        <Icon name="user-web/500/face" height={128} />
        <h2 className="text-18 font-semibold text-center mb-5">
          웹 사이트에서 페이지를 표시할 수 없습니다.
        </h2>
        <div className="flex flex-col items-center">
          <span className="text-14 font-medium text-center mb-[10px]">
            가능성이 높은 원인
          </span>
          <ul className="font-normal text-center">
            <li className="text-13 list-inside list-item list-disc">
              웹 사이트는 유지 관리 중 입니다.
            </li>
            <li className="text-13 list-inside list-item list-disc">
              웹 사이트에 프로그래밍 오류가 있습니다.
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-14 font-medium text-center mb-[10px]">
            가능한 해결 방법
          </span>
          <ul className=" font-normal text-center">
            <li className="text-13 list-inside list-item list-disc">
              페이지를 새로 고칩니다.
            </li>
            <li className="text-13 list-inside list-item list-disc">
              이전 페이지로 돌아갑니다.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
