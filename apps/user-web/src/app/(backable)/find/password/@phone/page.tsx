'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { PhoneNumber, SmsCode } from '@components/signup/identification';
import { API_SMS, API_USER } from '@lib/constants';
import { APIError, customFetch } from '@swifty/shared-lib';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FindPasswordContext, findPasswordSteps } from '../context';

export default function Page() {
  const form = useFormContext();
  const { nextStep, currentStep } = useContext(FindPasswordContext);
  const name =
    currentStep === '휴대폰 번호를 입력하세요' ? 'phoneNumber' : 'smsCode';
  const { invalid } = form.getFieldState(name);

  const onClick = async () => {
    const phoneNumber = form.getValues('phoneNumber');
    const id = form.getValues('id');
    if (currentStep === '휴대폰 번호를 입력하세요') {
      try {
        await customFetch(API_SMS.sms, {
          method: 'post',
          body: JSON.stringify({
            phoneNumber,
            smsSituationCode: 'RESET_PWD',
          }),
        });
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
        await customFetch(API_SMS.smsCheck, {
          method: 'post',
          body: JSON.stringify({
            code: form.getValues('smsCode'),
            phoneNumber: form.getValues('phoneNumber'),
            situationCode: 'RESET_PWD',
          }),
        });
        await customFetch(
          `${API_USER.checkId}?loginId=${encodeURI(id)}&phone=${phoneNumber}`,
          {
            method: 'GET',
          },
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
      <div className="flex flex-col w-full gap-5">
        <Funnel step={currentStep} steps={findPasswordSteps}>
          <Funnel.Step<StepType> step="휴대폰 번호를 입력하세요">
            <PhoneNumber />
          </Funnel.Step>
          <Funnel.Step<StepType> step="인증번호를 입력하세요">
            <SmsCode situationCode="RESET_PWD" />
          </Funnel.Step>
        </Funnel>
      </div>
      <FixedBottomCTA disabled={invalid} onClick={onClick}>
        확인
      </FixedBottomCTA>
    </>
  );
}
