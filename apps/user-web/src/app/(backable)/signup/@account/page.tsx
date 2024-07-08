'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import { Id, Password, PasswordConfirm } from '@components/signup/account';
import { type NonEmptyArray } from '@swifty/shared-lib';
import { useContext } from 'react';

import { type Step, StepContext, steps } from '../context';

type StepType = Readonly<NonEmptyArray<Step>>;

export default function AccountPage() {
  const { nextStep, currentStep } = useContext(StepContext);

  const onNext = () => {
    nextStep();
  };

  return (
    <>
      <section className="flex flex-col gap-5">
        <Funnel steps={steps} step={currentStep}>
          <Funnel.Step<StepType> step="비밀번호를 한번 더 입력해주세요">
            <PasswordConfirm />
          </Funnel.Step>
          <Funnel.Step<StepType> step="사용하실 비밀번호를 입력해주세요">
            <Password />
          </Funnel.Step>
          <Funnel.Step<StepType> step="사용하실 아이디를 입력해주세요">
            <Id />
          </Funnel.Step>
        </Funnel>
      </section>
      <FixedBottomCTA type="button" onClick={onNext}>
        다음
      </FixedBottomCTA>
    </>
  );
}
