'use client';

import {
  FindPasswordContext,
  steps,
} from '@app/(backable)/change-password/context';
import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import type { StepType } from '@components/signup/funnel';
import { PhoneNumber } from '@components/signup/identification';
import { useContext } from 'react';

export default function PasswordPage() {
  const { currentStep, nextStep } = useContext(FindPasswordContext);
  return (
    <>
      <section>
        <Funnel step={currentStep} steps={steps}>
          <Funnel.Step<StepType> step="휴대폰 번호를 입력하세요">
            <PhoneNumber />
          </Funnel.Step>

          <Funnel.Step<StepType> step="인증번호를 입력하세요">
            <PhoneNumber />
          </Funnel.Step>
        </Funnel>
      </section>
      <FixedBottomCTA>다음</FixedBottomCTA>
    </>
  );
}
