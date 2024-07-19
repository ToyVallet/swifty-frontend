'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { PhoneNumber, SmsCode } from '@components/signup/identification';
import { zodResolver } from '@hookform/resolvers/zod';
import { API_SMS, API_USER } from '@lib/constants';
import { APIError, customFetch, revalidate } from '@swifty/shared-lib';
import { Form } from '@swifty/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  phoneNumber: z
    .string()
    .refine(
      (value) => /^\d{3}-\d{4}-\d{4}$/.test(value),
      '010-1234-5678 형식입니다.',
    ),
  smsCode: z
    .string()
    .refine((value) => /^\d{6}$/.test(value), '6자리 숫자입니다.'),
});

type Schema = z.infer<typeof schema>;

const steps = ['phoneNumber', 'smsCode'] as const;

export default function ChangePhoneNumberForm() {
  const router = useRouter();
  const [step, setStep] = useState<(typeof steps)[number]>(steps[0]);
  const form = useForm<Schema>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const {
    formState: { errors, dirtyFields },
  } = form;

  const currentStepError = errors[step];
  const isCurrentStepDirty = dirtyFields[step];

  const onNext = async () => {
    const phoneNumber = form.getValues('phoneNumber');
    if (step === 'phoneNumber') {
      // 인증 번호 요청 api
      try {
        await customFetch(API_SMS.sms, {
          method: 'post',
          body: JSON.stringify({
            phoneNumber,
            smsSituationCode: 'CHANGE_PHONE_NUMBER',
          }),
          credentials: 'include',
        });
        setStep(steps[1]);
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
    if (step === 'smsCode') {
      try {
        await customFetch(API_SMS.smsCheck, {
          method: 'post',
          body: JSON.stringify({
            code: form.getValues('smsCode'),
            phoneNumber: form.getValues('phoneNumber'),
            situationCode: 'CHANGE_PHONE_NUMBER',
          }),
          credentials: 'include',
        });

        await customFetch(API_USER.changePhone, {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify({
            phoneNumber,
          }),
        });

        await revalidate('user');
        router.push('/mypage/change-phone-number/complete');
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
  };
  return (
    <>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Funnel step={step} steps={steps}>
            <Funnel.Step<StepType> step="phoneNumber">
              <PhoneNumber />
            </Funnel.Step>
            <Funnel.Step<StepType> step="smsCode">
              <SmsCode />
            </Funnel.Step>
          </Funnel>
        </form>
      </Form>
      <FixedBottomCTA
        onClick={onNext}
        type="button"
        disabled={!isCurrentStepDirty || !!currentStepError}
      >
        완료
      </FixedBottomCTA>
    </>
  );
}