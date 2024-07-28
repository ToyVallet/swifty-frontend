'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { PhoneNumber, SmsCode } from '@components/signup/identification';
import { APIError, http } from '@swifty/shared-lib';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { checkSmsCode, sendSms } from 'src/api';

import { FindIdContext, findIdSteps } from '../context';

export default function Page() {
  const form = useFormContext();
  const { nextStep, currentStep } = useContext(FindIdContext);
  const name =
    currentStep === '휴대폰 번호를 입력하세요' ? 'phoneNumber' : 'smsCode';
  const { invalid, isDirty } = form.getFieldState(name);

  const onClick = async () => {
    const phoneNumber = form.getValues('phoneNumber');
    const userName = form.getValues('name');

    if (currentStep === '휴대폰 번호를 입력하세요') {
      try {
        await sendSms(phoneNumber, 'FIND_BY_ID');
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
      try {
        const code: string = form.getValues('smsCode');
        const phoneNumber: string = form.getValues('phoneNumber');
        await checkSmsCode(code, phoneNumber, 'FIND_BY_ID');
        await http.get('/user/check/name', {
          query: {
            name: userName,
            phone: phoneNumber,
          },
        });
        const name = form.getValues('name');
        const { loginId } = await http.post<{ loginId: string }>('/user/id', {
          name,
          phoneNumber,
        });

        form.setValue('findId', loginId);
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
      <div className="flex flex-col w-full gap-5">
        <Funnel step={currentStep} steps={findIdSteps}>
          <Funnel.Step<StepType> step="휴대폰 번호를 입력하세요">
            <PhoneNumber />
          </Funnel.Step>
          <Funnel.Step<StepType> step="인증번호를 입력하세요">
            <SmsCode situationCode="FIND_BY_ID" />
          </Funnel.Step>
        </Funnel>
      </div>
      <FixedBottomCTA disabled={invalid || !isDirty} onClick={onClick}>
        확인
      </FixedBottomCTA>
    </>
  );
}
