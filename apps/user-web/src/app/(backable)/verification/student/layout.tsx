'use client';

import { Main, Navigation } from '@components/common';
import { Header } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { Choose, Form, When } from '@swifty/ui';
import { convertNewlineToJSX } from '@toss/react';
import { AnimatePresence } from 'framer-motion';
import React, { type PropsWithChildren, type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  type CertificationStep,
  CertificationStepContext,
  certificationsSteps,
} from './context';
import { type UnivFormValues, univFormSchema } from './schema';

type UnivCertificationLayoutProps = PropsWithChildren<{
  example: ReactNode;
  complete: ReactNode;
  certification: ReactNode;
  info: ReactNode;
}>;

export default function UnivCertificationLayout({
  example,
  complete,
  certification,
  info,
}: UnivCertificationLayoutProps) {
  const form = useForm<UnivFormValues>({
    mode: 'onChange',
    resolver: zodResolver(univFormSchema),
  });

  const [currentStep, setCurrentStep] = useState<CertificationStep>(
    certificationsSteps[0],
  );

  const nextStep = () => {
    const nextStepIndex = certificationsSteps.indexOf(currentStep) + 1;

    const nextStep = certificationsSteps[nextStepIndex];
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  return (
    <>
      <Navigation title="학적 인증" bg="transparent" />
      <CertificationStepContext.Provider value={{ currentStep, nextStep }}>
        <Main className="h-full overflow-auto scrollbar-hide mt-[30px] px-5">
          <Header>
            <Choose value={currentStep}>
              <When value="학적 인증을 시작할게요">
                {currentStep}
                <Header.Subtitle>
                  학적 인증을 위해 아래의 정보를 확인해주세요.
                </Header.Subtitle>
              </When>
              <When value="인증 이미지를 업로드 해주세요">{currentStep}</When>
              <When value="학적 정보를 입력해주세요">
                {currentStep}
                <Header.Subtitle>
                  학적 인증을 위해 아래의 정보를 입력해주세요.
                </Header.Subtitle>
              </When>
              <When value="학적 인증 신청이 완료되었습니다.">
                {convertNewlineToJSX('학적 인증 신청이\n 완료 되었습니다')}
              </When>
            </Choose>
          </Header>
          <AnimatePresence initial={false}>
            <Form {...(form as any)}>
              <form className="w-full h-full">
                <Choose value={currentStep}>
                  <When value="학적 인증을 시작할게요">{example}</When>
                  <When value="인증 이미지를 업로드 해주세요">
                    {certification}
                  </When>
                  <When value="학적 정보를 입력해주세요">{info}</When>
                  <When value="학적 인증 신청이 완료되었습니다.">
                    {complete}
                  </When>
                </Choose>
              </form>
            </Form>
          </AnimatePresence>
        </Main>
      </CertificationStepContext.Provider>
    </>
  );
}
