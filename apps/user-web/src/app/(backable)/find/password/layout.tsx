'use client';

import { Main, Navigation } from '@components/common';
import { Header } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { Choose, Form, When } from '@swifty/ui';
import { AnimatePresence } from 'framer-motion';
import { type PropsWithChildren, type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FindPasswordContext,
  type FindPasswordSteps,
  findPasswordSteps,
  passwordSteps,
  phoneSteps,
} from './context';
import { type FindPasswordSchema, findPasswordSchema } from './schema';

type Props = PropsWithChildren<{
  id: ReactNode;
  phone: ReactNode;
  password: ReactNode;
  complete: ReactNode;
}>;

export default function Page({ id, phone, password, complete }: Props) {
  const form = useForm<FindPasswordSchema>({
    mode: 'onChange',
    resolver: zodResolver(findPasswordSchema),
  });

  const [currentStep, setCurrentStep] = useState<FindPasswordSteps>(
    findPasswordSteps[0],
  );

  const nextStep = () => {
    const nextStepIndex = findPasswordSteps.indexOf(currentStep) + 1;

    const nextValue = findPasswordSteps[nextStepIndex];
    if (nextValue) {
      setCurrentStep(nextValue);
    }
  };
  return (
    <>
      <Navigation title="아이디 찾기" />
      <FindPasswordContext.Provider value={{ currentStep, nextStep }}>
        <Main className="relative pb-20 scrollbar-hide px-5 mt-[47px]">
          <Header>{currentStep}</Header>

          <AnimatePresence initial={false}>
            <Form {...form}>
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Choose value={currentStep}>
                  <When value="아이디를 입력하세요">{id}</When>

                  {phoneSteps.map((step) => (
                    <When key={step} value={step}>
                      {phone}
                    </When>
                  ))}

                  {passwordSteps.map((step) => (
                    <When key={step} value={step}>
                      {password}
                    </When>
                  ))}

                  <When value="비밀번호가 재설정 되었습니다">{complete}</When>
                </Choose>
              </form>
            </Form>
          </AnimatePresence>
        </Main>
      </FindPasswordContext.Provider>
    </>
  );
}
