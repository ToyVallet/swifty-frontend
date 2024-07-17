'use client';

import {
  FindPasswordContext,
  steps,
  stepsWithForm,
} from '@app/(backable)/change-password/context';
import { FixedBottomCTA } from '@components/common';
import { Password } from '@components/find-password';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

export default function PasswordPage() {
  const { currentStep, nextStep } = useContext(FindPasswordContext);

  const form = useFormContext();
  const {
    formState: { errors, dirtyFields },
  } = form;

  const currentStepFormName = stepsWithForm[currentStep];
  const currentStepError = errors[currentStepFormName];
  const isCurrentStepDirty = dirtyFields[currentStepFormName];

  const onNext = async () => {
    if (currentStep === '비밀번호를 확인해주세요') {
      // 비밀번호 변경 요청
    }
    nextStep();
  };
  return (
    <>
      <section className="flex flex-col gap-5">
        <Funnel step={currentStep} steps={steps}>
          <Funnel.Step<StepType> step="현재 비밀번호를 입력하세요">
            <Password name="currentPassword" label="현재 비밀번호" />
          </Funnel.Step>

          <Funnel.Step<StepType> step="새 비밀번호를 입력하세요">
            <Password name="newPassword" label="새 비밀번호" />
          </Funnel.Step>

          <Funnel.Step<StepType> step="비밀번호를 확인해주세요">
            <Password name="confirmNewPassword" label="비밀번호 확인" />
          </Funnel.Step>
        </Funnel>
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
