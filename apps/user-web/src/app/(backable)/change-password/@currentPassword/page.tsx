'use client';

import {
  FindPasswordContext,
  stepsWithForm,
} from '@app/(backable)/change-password/context';
import { FixedBottomCTA } from '@components/common';
import { Password } from '@components/find-password';
import { customFetch } from '@swifty/shared-lib';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

export default function PhonePage() {
  const { currentStep, nextStep } = useContext(FindPasswordContext);

  const form = useFormContext();
  const {
    formState: { errors, dirtyFields },
  } = form;

  const currentStepFormName = stepsWithForm[currentStep];
  const currentStepError = errors[currentStepFormName];
  const isCurrentStepDirty = dirtyFields[currentStepFormName];

  const onNext = async () => {
    // 현재 비밀번호 일치 여부 확인
    try {
      nextStep();
    } catch (err) {}
  };
  return (
    <>
      <section className="flex flex-col gap-5">
        <Password name="currentPassword" label="현재 비밀번호" />
      </section>
      <FixedBottomCTA
        type="button"
        onClick={onNext}
        disabled={!isCurrentStepDirty || !!currentStepError}
      >
        다음
      </FixedBottomCTA>
    </>
  );
}
