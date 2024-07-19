'use client';

import { Main, Navigation } from '@components/common';
import { Header } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { Choose, Form, When } from '@swifty/ui';
import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FindPasswordContext,
  type FindPasswordStep,
  currentPasswordSteps,
  newPasswordSteps,
  phoneSteps,
  steps,
} from './context';
import { type FindPasswordSchema, findPasswordSchema } from './schema';

type Props = {
  phone: ReactNode;
  currentPassword: ReactNode;
  newPassword: ReactNode;
  complete: ReactNode;
};

export default function SearchLayout({
  phone,
  currentPassword,
  newPassword,
  complete,
}: Props) {
  const form = useForm<FindPasswordSchema>({
    mode: 'onChange',
    resolver: zodResolver(findPasswordSchema),
  });
  const [currentStep, setCurrentStep] = useState<FindPasswordStep>(steps[0]);

  const nextStep = () => {
    const nextStepIndex = steps.indexOf(currentStep) + 1;

    const nextStepText = steps[nextStepIndex];
    if (nextStepText) {
      setCurrentStep(nextStepText);
    }
  };
  return (
    <div className="w-full px-5">
      <Navigation variant="back" title="비밀번호 재설정" />
      <FindPasswordContext.Provider value={{ currentStep, nextStep }}>
        <Main>
          <Header>{currentStep}</Header>
          <Form {...form}>
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Choose value={currentStep}>
                {phoneSteps.map((step) => (
                  <When key={step} value={step}>
                    {phone}
                  </When>
                ))}
                {currentPasswordSteps.map((step) => (
                  <When key={step} value={step}>
                    {currentPassword}
                  </When>
                ))}
                {newPasswordSteps.map((step) => (
                  <When key={step} value={step}>
                    {newPassword}
                  </When>
                ))}
                <When value={'비밀번호가 재설정 되었습니다.'}>{complete}</When>
              </Choose>
            </form>
          </Form>
        </Main>
      </FindPasswordContext.Provider>
    </div>
  );
}
