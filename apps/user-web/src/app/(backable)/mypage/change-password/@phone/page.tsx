'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { PhoneNumber, SmsCode } from '@components/signup/identification';
import { APIError, http } from '@swifty/shared-lib';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { checkSmsCode, sendSms } from 'src/api';

import { FindPasswordContext, steps, stepsWithForm } from '../context';

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
        await sendSms(phoneNumber, 'CHANGE_PWD');
      } catch (e) {
        if (APIError.isAPIError(e)) {
          form.setError('phoneNumber', {
            type: String(e.statusCode),
            message: e.message[0],
          });
        }
        return;
      }
    }
    if (currentStep === '인증번호를 입력하세요') {
      // 인증 번호 입력
      try {
        await checkSmsCode(
          form.getValues('smsCode'),
          form.getValues('phoneNumber'),
          'CHANGE_PWD',
        );
      } catch (e) {
        if (APIError.isAPIError(e)) {
          form.setError('smsCode', {
            type: String(e.statusCode),
            message: e.message[0],
          });
        }
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
            <SmsCode situationCode="CHANGE_PWD" />
          </Funnel.Step>
        </Funnel>
      </section>
      <FixedBottomCTA
        onClick={onNext}
        disabled={!isCurrentStepDirty || !!currentStepError}
      >
        다음
      </FixedBottomCTA>
    </>
  );
}
