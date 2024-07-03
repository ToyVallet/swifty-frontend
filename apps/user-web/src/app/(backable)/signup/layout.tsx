'use client';

import { Header } from '@components/signup';
import { Choose, Otherwise, When } from '@swifty/ui';
import React, {
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react';
import { Step, StepContext, accountSteps, identificationSteps, steps } from './context';

type SignupLayoutProps = PropsWithChildren<{
  terms: React.ReactNode;
  identification: React.ReactNode;
  account: React.ReactNode;
  complete: React.ReactNode;
}>;


export default function SignupLayout({
  terms,
  identification,
  account,
  complete,
}: SignupLayoutProps) {
  const [currentStep, setCurrentStep] =
    useState<Step>('회원가입이 완료되었어요');

  const nextStep = useCallback(() => {
    const nextStepIndex = steps.indexOf(currentStep) + 1;

    if (steps[nextStepIndex]) {
      setCurrentStep(steps[nextStepIndex] as Step);
    }
  }, []);

  return (
    <StepContext.Provider value={{ currentStep, nextStep }}>
      <section className="h-full flex flex-col relative">
        <Header>{currentStep}</Header>

        <Choose value={currentStep}>
          <When value="약관 동의가 필요해요">{terms}</When>

          {identificationSteps.map((step) => (
            <When key={step} value={step}>
              {identification}
            </When>
          ))}

          {accountSteps.map((step) => (
            <When key={step} value={step}>
              {account}
            </When>
          ))}

          <When value="회원가입이 완료되었어요">{complete}</When>

        </Choose>
      </section>
    </StepContext.Provider>
  );
}
