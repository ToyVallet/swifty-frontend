'use client';

import type { FormValues } from '@app/(backable)/signup/schema';
import { formSchema } from '@app/(backable)/signup/schema';
import {
  type CertificationStep,
  CertificationStepContext,
  certificationsSteps,
} from '@app/(backable)/univ-certification/context';
import { Navigation } from '@components/common';
import { Header } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { Choose, When } from '@swifty/ui';
import { AnimatePresence } from 'framer-motion';
import { type PropsWithChildren, type ReactNode, useState } from 'react';
import { Form, useForm } from 'react-hook-form';

type UnivCertificationLayoutProps = PropsWithChildren<{
  example: ReactNode;
  complete: ReactNode;
  certification: ReactNode;
}>;

export default function UnivCertificationLayout({
  example,
  complete,
  certification,
}: UnivCertificationLayoutProps) {
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
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
      <Navigation variant="back" title="학적 인증" />
      <CertificationStepContext.Provider value={{ currentStep, nextStep }}>
        <main className="h-full flex flex-col relative pb-20 overflow-y-auto scrollbar-hide">
          <Header>{currentStep}</Header>
          <AnimatePresence initial={false}>
            <Form {...form}>
              <form className="text-white">
                <Choose value={currentStep}>
                  <When value="학적 인증을 시작할게요">{example}</When>
                  <When value="인증 이미지를 업로드 해주세요">
                    {certification}
                  </When>
                  <When value="학적 인증 신청이 완료되었습니다.">
                    {complete}
                  </When>
                </Choose>
              </form>
            </Form>
          </AnimatePresence>
        </main>
      </CertificationStepContext.Provider>
    </>
  );
}
