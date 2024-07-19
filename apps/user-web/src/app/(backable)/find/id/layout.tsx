'use client';

import { Main, Navigation } from '@components/common';
import { Header } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { Choose, Form, When } from '@swifty/ui';
import { AnimatePresence } from 'framer-motion';
import { type PropsWithChildren, type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FindIdContext,
  type FindIdSteps,
  findIdSteps,
  phoneSteps,
} from './context';
import { type FindIdSchema, findIdSchema } from './schema';

type Props = PropsWithChildren<{
  complete: ReactNode;
  name: ReactNode;
  phone: ReactNode;
}>;

export default function Page({ complete, name, phone }: Props) {
  const form = useForm<FindIdSchema>({
    mode: 'onChange',
    resolver: zodResolver(findIdSchema),
  });

  const [currentStep, setCurrentStep] = useState<FindIdSteps>(findIdSteps[0]);

  const nextStep = () => {
    const nextStepIndex = findIdSteps.indexOf(currentStep) + 1;

    const nextValue = findIdSteps[nextStepIndex];
    if (nextValue) {
      setCurrentStep(nextValue);
    }
  };
  return (
    <>
      <Navigation variant="back" title="아이디 찾기" />
      <FindIdContext.Provider value={{ currentStep, nextStep }}>
        <Main className="relative pb-20 scrollbar-hide px-5 mt-[47px]">
          <Header>
            {currentStep}
            {currentStep === '회원님의 아이디를 찾았어요' && (
              <Header.Subtitle>
                휴대폰 번호 정보와 일치하는 아이디입니다.
              </Header.Subtitle>
            )}
          </Header>

          <AnimatePresence initial={false}>
            <Form {...form}>
              <form
                className="text-white w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Choose value={currentStep}>
                  <When value="성함을 입력하세요">{name}</When>

                  {phoneSteps.map((step) => (
                    <When key={step} value={step}>
                      {phone}
                    </When>
                  ))}

                  <When value="회원님의 아이디를 찾았어요">{complete}</When>
                </Choose>
              </form>
            </Form>
          </AnimatePresence>
        </Main>
      </FindIdContext.Provider>
    </>
  );
}
