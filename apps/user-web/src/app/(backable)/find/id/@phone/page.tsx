'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { PhoneNumber, SmsCode } from '@components/signup/identification';
import { API_SMS, API_USER } from '@lib/constants';
import { APIError, customFetch } from '@swifty/shared-lib';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FindIdContext, findIdSteps } from '../context';

export default function Page() {
  const form = useFormContext();
  const { nextStep, currentStep } = useContext(FindIdContext);
  const name =
    currentStep === '휴대폰 번호를 입력하세요' ? 'phoneNumber' : 'smsCode';
  const { invalid } = form.getFieldState(name);

  const onClick = async () => {
    const phoneNumber = form.getValues(name);
    const userName = form.getValues('name');
    if (currentStep === '휴대폰 번호를 입력하세요') {
      try {
        await customFetch(API_SMS.sms, {
          method: 'post',
          body: JSON.stringify({
            phoneNumber,
            smsSituationCode: 'FIND_BY_ID',
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
            situationCode: 'FIND_BY_ID',
          }),
        });
        await customFetch(
          `${API_USER.checkName}?name=${encodeURI(userName)}&phone=${phoneNumber}`,
          {
            method: 'GET',
          },
        );
        await customFetch(API_USER.findId, {
          method: 'POST',
          body: JSON.stringify({
            name: form.getValues('name'),
            phoneNumber,
          }),
        });
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
      <FixedBottomCTA disabled={invalid} onClick={onClick}>
        확인
      </FixedBottomCTA>
    </>
  );
}
