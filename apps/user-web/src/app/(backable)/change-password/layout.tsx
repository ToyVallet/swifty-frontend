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
  passwordSteps,
  phoneSteps,
  steps,
} from './context';
import { type FindPasswordSchema, findPasswordSchema } from './schema';

type Props = {
  password: ReactNode;
  phone: ReactNode;
  complete: ReactNode;
};

export default function SearchLayout({ password, phone, complete }: Props) {
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
    <>
      <Navigation variant="back" title="비밀번호 재설정" />
      <FindPasswordContext.Provider value={{ currentStep, nextStep }}>
        <Main>
          <Header>{currentStep}</Header>
          <Form {...form}>
            <form className="w-full">
              <Choose value={currentStep}>
                {phoneSteps.map((step) => (
                  <When value={step}>{phone}</When>
                ))}
                {passwordSteps.map((step) => (
                  <When value={step}>{password}</When>
                ))}
                <When value={'비밀번호가 재설정 되었습니다.'}>{complete}</When>
              </Choose>
            </form>
          </Form>
        </Main>
      </FindPasswordContext.Provider>
    </>
  );
}
