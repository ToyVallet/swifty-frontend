'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import { Id, Password, PasswordConfirm } from '@components/signup/account';
import { API_USER } from '@lib/constants';
import { type NonEmptyArray, customFetch } from '@swifty/shared-lib';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { SignUpStepContext, type Step, steps, stepsWithForm } from '../context';

type StepType = Readonly<NonEmptyArray<Step>>;

export default function AccountPage() {
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

    // 아이디 중복 확인
    if (currentStep === '사용하실 아이디를 입력해주세요') {
      const id = form.getValues(currentStepFormName);

      if (id === 'js9534') {
        form.setError('id', { message: '중복된 아이디가 있습니다.' });
        form.setFocus(currentStepFormName);
        return;
      }
    }

    if (currentStep === '비밀번호를 한번 더 입력해주세요') {
      // 회원가입 요청 전송하기
      const formData = form.getValues();
      const keys = Object.keys(formData);
      const body = keys.reduce(
        (acc, cur) => {
          if (cur === 'passwordConfirm' || cur === 'smsCode') return acc;
          acc[cur] = formData[cur];
          return acc;
        },
        {} as { [key: string]: string | boolean },
      );

      try {
        await customFetch(API_USER.signup, {
          method: 'post',
          body: JSON.stringify(body),
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
        {currentStep === '비밀번호를 한번 더 입력해주세요'
          ? '회원가입'
          : '확인'}
      </FixedBottomCTA>
    </>
  );
}
