'use client';

import { FixedBottomCTA } from '@components/common';
import { Password } from '@components/mypage';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { APIError, http } from '@swifty/shared-lib';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FindPasswordContext, steps, stepsWithForm } from '../context';

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
      try {
        await http.patch(
          '/user/change/pwd',
          {
            newPwd: form.getValues('newPassword'),
          },
          { credentials: 'include' },
        );
      } catch (e) {
        if (APIError.isAPIError(e)) {
          form.setError('newPassword', {
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
          <Funnel.Step<StepType> step="새 비밀번호를 입력하세요">
            <Password name="newPassword" label="새 비밀번호" />
          </Funnel.Step>

          <Funnel.Step<StepType> step="비밀번호를 확인해주세요">
            <Password name="confirmNewPassword" label="비밀번호 확인" />
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
