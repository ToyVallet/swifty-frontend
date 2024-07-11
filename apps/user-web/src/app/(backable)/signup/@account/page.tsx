'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import { Id, Password, PasswordConfirm } from '@components/signup/account';
import { type NonEmptyArray } from '@swifty/shared-lib';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { type Step, StepContext, steps, stepsWithForm } from '../context';

type StepType = Readonly<NonEmptyArray<Step>>;

export default function AccountPage() {
  const { nextStep, currentStep } = useContext(StepContext);

  const form = useFormContext();
  const {
    formState: { errors, dirtyFields },
  } = form;

  const currentStepFormName = stepsWithForm[currentStep];
  const currentStepError = errors[currentStepFormName];
  const isCurrentStepDirty = dirtyFields[currentStepFormName];

  const onNext = async () => {
    if (currentStepError && !isCurrentStepDirty) return;

    // 아이디 중복 확인
    if (currentStep === '사용하실 아이디를 입력해주세요') {
      const id = form.getValues(currentStepFormName);
      if (id === 'js9534') {
        form.setError('id', { message: '중복된 아이디가 있습니다.' });
        form.setFocus(currentStepFormName);
        return;
      }
    }
    useEffect(() => {
      form.setFocus(currentStepFormName);
    }, [currentStepFormName]);

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
      <FixedBottomCTA
        type="button"
        onClick={onNext}
        disabled={!isCurrentStepDirty || !!currentStepError}
      >
        확인
      </FixedBottomCTA>
    </>
  );
}
