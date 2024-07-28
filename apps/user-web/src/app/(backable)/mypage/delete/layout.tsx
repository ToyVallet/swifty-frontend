'use client';

import { Main, Navigation } from '@components/common';
import { Choose, When } from '@swifty/ui';
import { AnimatePresence } from 'framer-motion';
import { type PropsWithChildren, type ReactNode, useState } from 'react';

import {
  DeleteUserContext,
  type DeleteUsersteps,
  deleteUsersteps,
} from './context';

export default function UserDelteLayout({
  complete,
  noti,
  password,
}: PropsWithChildren<{
  complete: ReactNode;
  noti: ReactNode;
  password: ReactNode;
}>) {
  const [currentStep, setCurrentStep] = useState<DeleteUsersteps>(
    deleteUsersteps[0],
  );

  const nextStep = () => {
    const nextStepIndex = deleteUsersteps.indexOf(currentStep) + 1;

    const nextValue = deleteUsersteps[nextStepIndex];
    if (nextValue) {
      setCurrentStep(nextValue);
    }
  };

  return (
    <>
      <Navigation title="회원 탈퇴" bg="blur" />
      <DeleteUserContext.Provider value={{ currentStep, nextStep }}>
        <h2 className="text-center font-bold text-26 mt-[44px]">
          {currentStep}
        </h2>
        <Main className="relative pb-20 scrollbar-hide w-full px-5">
          <AnimatePresence initial={false}>
            <Choose value={currentStep}>
              <When value="비밀번호를 입력하세요">{password}</When>
              <When value="안내사항을 확인해주세요">{noti}</When>
              <When value="회원탈퇴가 완료되었어요">{complete}</When>
            </Choose>
          </AnimatePresence>
        </Main>
      </DeleteUserContext.Provider>
    </>
  );
}
