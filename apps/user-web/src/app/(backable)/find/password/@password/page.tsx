'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import { Password, PasswordConfirm } from '@components/signup/account';
import type { StepType } from '@components/signup/funnel';
import { APIError, http } from '@swifty/shared-lib';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FindPasswordContext, findPasswordSteps } from '../context';

export default function Page() {
  const form = useFormContext();
  const { nextStep, currentStep } = useContext(FindPasswordContext);

  const name =
    currentStep === '새 비밀번호를 입력하세요' ? 'password' : 'passwordConfirm';
  const { invalid } = form.getFieldState(name);

  const onClick = async () => {
    const password = form.getValues('password');
    const phoneNumber = form.getValues('phoneNumber');
    if (currentStep === '비밀번호를 확인해주세요') {
      try {
        await http.patch('/user/pwd', {
          body: {
            phoneNumber,
            password,
          },
        });
      } catch (e) {
        if (APIError.isAPIError(e)) {
          form.setError('passwordConfirm', {
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
      <div className="flex flex-col w-full gap-5">
        <Funnel step={currentStep} steps={findPasswordSteps}>
          <Funnel.Step<StepType> step="새 비밀번호를 입력하세요">
            <Password />
          </Funnel.Step>
          <Funnel.Step<StepType> step="비밀번호를 확인해주세요">
            <PasswordConfirm />
          </Funnel.Step>
        </Funnel>
      </div>
      <FixedBottomCTA disabled={invalid} onClick={onClick}>
        확인
      </FixedBottomCTA>
    </>
  );
}
