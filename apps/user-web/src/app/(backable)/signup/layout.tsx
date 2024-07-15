'use client';

import { Main, Navigation } from '@components/common';
import { Header } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { Choose, Form, When } from '@swifty/ui';
import { AnimatePresence } from 'framer-motion';
import React, { type PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  type Step,
  StepContext,
  accountSteps,
  identificationSteps,
  steps,
} from './context';
import { type FormValues, formSchema } from './schema';

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
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);

  const nextStep = () => {
    const nextStepIndex = steps.indexOf(currentStep) + 1;

    if (steps[nextStepIndex] !== undefined) {
      setCurrentStep(steps[nextStepIndex] as Step);
    }
  };

  return (
    <>
      <Navigation variant="back" title="회원가입" />
      <StepContext.Provider value={{ currentStep, nextStep }}>
        <Main className="relative pb-20 overflow-y-auto scrollbar-hide">
          <Header>{currentStep}</Header>

          <AnimatePresence initial={false}>
            <Form {...form}>
              <form className="text-white">
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
              </form>
            </Form>
          </AnimatePresence>
        </Main>
      </StepContext.Provider>
    </>
  );
}
