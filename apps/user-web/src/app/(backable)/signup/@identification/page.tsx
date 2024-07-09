'use client';

import { FixedBottomCTA } from '@components/common';
import { Funnel } from '@components/signup';
import {
  CarrierWithNationality,
  DateOfBirth,
  Name,
  PhoneNumber,
  Sex,
  SmsCode,
} from '@components/signup/identification';
import { type NonEmptyArray } from '@swifty/shared-lib';
import { useContext } from 'react';

import { type Step, StepContext, steps } from '../context';

type StepType = Readonly<NonEmptyArray<Step>>;

export default function Identification() {
  const { nextStep, currentStep } = useContext(StepContext);
  const onNext = () => {
    nextStep();
  };

  return (
    <>
      <section className="flex flex-col gap-5">
        <Funnel step={currentStep} steps={steps}>
          <Funnel.Step<StepType> step="휴대폰 번호를 인증할게요">
            <SmsCode />
          </Funnel.Step>

          <Funnel.Step<StepType> step="휴대폰 번호를 알려주세요">
            <PhoneNumber />
          </Funnel.Step>

          <Funnel.Step<StepType> step="통신사를 선택해주세요">
            <CarrierWithNationality />
          </Funnel.Step>

          <Funnel.Step<StepType> step="성별을 알려주세요">
            <Sex />
          </Funnel.Step>

          <Funnel.Step<StepType> step="생년월일을 알려주세요">
            <DateOfBirth />
          </Funnel.Step>

          <Funnel.Step<StepType> step="성함을 알려주세요">
            <Name />
          </Funnel.Step>
        </Funnel>
      </section>
      <FixedBottomCTA type="button" onClick={onNext}>
        다음
      </FixedBottomCTA>
    </>
  );
}
