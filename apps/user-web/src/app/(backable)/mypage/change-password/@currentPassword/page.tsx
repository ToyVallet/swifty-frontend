'use client';

import { FixedBottomCTA } from '@components/common';
import { Password } from '@components/mypage';
import { API_USER } from '@lib/constants';
import { APIError, customFetch } from '@swifty/shared-lib';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FindPasswordContext, stepsWithForm } from '../context';

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
      await customFetch(API_USER.checkPassword, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify({
          password: form.getValues('currentPassword'),
        }),
      });
      nextStep();
    } catch (e) {
      if (APIError.isAPIError(e)) {
        form.setError('currentPassword', {
          type: String(e.statusCode),
          message: e.message[0],
        });
      }
    }
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
