'use client';

import {
  FindPasswordContext,
  steps,
  stepsWithForm,
} from '@app/(backable)/change-password/context';
import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { PhoneNumber, SmsCode } from '@components/signup/identification';
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
    if (currentStep === '휴대폰 번호를 입력하세요') {
      // 인증 번호 요청 api
    }
    if (currentStep === '인증번호를 입력하세요') {
      // 인증 번호 입력
    }
    nextStep();
  };
  return (
    <>
      <section className="flex flex-col gap-5">
        <Funnel step={currentStep} steps={steps}>
          <Funnel.Step<StepType> step="휴대폰 번호를 입력하세요">
            <PhoneNumber />
          </Funnel.Step>

          <Funnel.Step<StepType> step="인증번호를 입력하세요">
            <SmsCode />
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
