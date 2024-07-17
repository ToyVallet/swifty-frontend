'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import {
  CarrierWithNationality,
  DateOfBirth,
  Gender,
  Name,
  PhoneNumber,
  SmsCode,
} from '@components/signup/identification';
import { API_SMS } from '@lib/constants';
import { type NonEmptyArray, customFetch } from '@swifty/shared-lib';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { SignUpStepContext, type Step, steps, stepsWithForm } from '../context';

type StepType = Readonly<NonEmptyArray<Step>>;

export default function Identification() {
  const { nextStep, currentStep } = useContext(SignUpStepContext);

  const form = useFormContext();
  const {
    formState: { errors, dirtyFields },
  } = form;

  const currentStepFormName = stepsWithForm[currentStep];
  const currentStepError = errors[currentStepFormName];
  const isCurrentStepDirty = dirtyFields[currentStepFormName];

  const onNext = async () => {
    if (currentStepError && !isCurrentStepDirty) return;

    // 인증 번호 요청
    if (currentStep === '휴대폰 번호를 알려주세요') {
      const phoneNumber = form.getValues(currentStepFormName);
      try {
        await customFetch(API_SMS.sms, {
          method: 'post',
          body: JSON.stringify({
            phoneNumber,
            smsSituationCode: 'SIGN_UP',
          }),
        });
      } catch (err) {
        form.setError('phoneNumber', {
          message: '인증 요청에 실패했습니다. 다시 시도해 주세요',
        });
        return;
      }

      // 문자 전송 전달 - 인증 요청
    }

    // 전화번호 인증 확인
    if (currentStep === '휴대폰 번호를 인증할게요') {
      try {
        await customFetch(API_SMS.smsCheck, {
          method: 'post',
          body: JSON.stringify({
            code: form.getValues('smsCode'),
            phoneNumber: form.getValues('phoneNumber'),
            situationCode: 'SIGN_UP',
          }),
        });
      } catch (err) {
        console.error(err);
        return;
      }
    }

    nextStep();
  };

  useEffect(() => {
    form.setFocus(currentStepFormName);
  }, [currentStepFormName]);

  return (
    <>
      <section className="flex flex-col gap-5">
        <Funnel step={currentStep} steps={steps}>
          <Funnel.Step<StepType> step="휴대폰 번호를 인증할게요">
            <SmsCode />
          </Funnel.Step>

          <Funnel.Step<StepType> step="휴대폰 번호를 알려주세요">
            <PhoneNumber />
          </Funnel.Step>

          <Funnel.Step<StepType> step="통신사를 선택해주세요">
            <CarrierWithNationality />
          </Funnel.Step>

          <Funnel.Step<StepType> step="성별을 알려주세요">
            <Gender />
          </Funnel.Step>

          <Funnel.Step<StepType> step="생년월일을 알려주세요">
            <DateOfBirth />
          </Funnel.Step>

          <Funnel.Step<StepType> step="성함을 알려주세요">
            <Name />
          </Funnel.Step>
        </Funnel>
      </section>
      <FixedBottomCTA
        type="button"
        onClick={onNext}
        disabled={!isCurrentStepDirty || !!currentStepError}
      >
        {currentStep === '휴대폰 번호를 알려주세요' ? '인증번호 발송' : '확인'}
      </FixedBottomCTA>
    </>
  );
}
