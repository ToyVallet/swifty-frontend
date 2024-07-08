'use client';

import { Header } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { Choose, Form, When } from '@swifty/ui';
import React, { type PropsWithChildren, useCallback, useState } from 'react';
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
    resolver: zodResolver(formSchema),
  });
  const [currentStep, setCurrentStep] =
    useState<Step>('휴대폰 번호를 인증할게요');

  const nextStep = useCallback(() => {
    const nextStepIndex = steps.indexOf(currentStep) + 1;

    if (steps[nextStepIndex]) {
      setCurrentStep(steps[nextStepIndex] as Step);
    }
  }, []);

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <StepContext.Provider value={{ currentStep, nextStep }}>
      <section className="h-full flex flex-col relative">
        <Header>{currentStep}</Header>

        <Form {...form}>
          <form onSubmit={onSubmit} className="text-white">
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
      </section>
    </StepContext.Provider>
  );
}
