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
import { API_SMS } from '@lib/constants';
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
    if (currentStep === '휴대폰 번호를 입력하세요') {
      const phoneNumber = form.getValues('phoneNumber');
      // 인증 번호 요청 api
      try {
        await customFetch(API_SMS.sms, {
          method: 'post',
          body: JSON.stringify({
            phoneNumber,
            smsSituationCode: 'RESET_PWD',
          }),
          credentials: 'include',
        });
      } catch (err) {
        form.setError('phoneNumber', {
          message: '인증 요청에 실패했습니다. 다시 시도해 주세요',
        });
        return;
      }
    }
    if (currentStep === '인증번호를 입력하세요') {
      // 인증 번호 입력
      try {
        await customFetch(API_SMS.smsCheck, {
          method: 'post',
          body: JSON.stringify({
            code: form.getValues('smsCode'),
            phoneNumber: form.getValues('phoneNumber'),
            situationCode: 'RESET_PWD',
          }),
        });
      } catch (err) {
        console.error(err);
        return;
      }
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
