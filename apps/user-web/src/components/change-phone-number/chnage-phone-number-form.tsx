'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { PhoneNumber, SmsCode } from '@components/signup/identification';
import { zodResolver } from '@hookform/resolvers/zod';
import { revalidate } from '@swifty/shared-lib';
import { Form } from '@swifty/ui';
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
    if (step === 'phoneNumber') {
      setStep(steps[1]);
    }
    if (step === 'smsCode') {
      await revalidate('user');
    }
  };
  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-5">
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
