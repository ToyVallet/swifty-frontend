'use client';

import { Header } from '@components/signup';
import { Choose, Otherwise, When } from '@swifty/ui';
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useCallback,
  useState,
} from 'react';

type SignupLayoutProps = PropsWithChildren<{
  terms: ReactNode;
  identification: ReactNode;
  account: ReactNode;
  complete: ReactNode;
}>;

const termsSteps = ['약관 동의가 필요해요'] as const;

const identificationSteps = [
  '성함을 알려주세요',
  '생년월일을 알려주세요',
  '성별을 알려주세요',
  '휴대폰 번호를 인증할게요',
] as const;

const accountSteps = [
  '사용하실 아이디를 입력해주세요',
  '사용하실 비밀번호를 입력해주세요',
  '비밀번호를 한번 더 입력해주세요',
] as const;

export const steps = [
  ...termsSteps,
  ...identificationSteps,
  ...accountSteps,
  '회원가입이 완료되었어요',
] as const;

export type Step = (typeof steps)[number];

export const StepContext = createContext<{
  currentStep: Step;
  nextStep: () => void;
}>({
  currentStep: steps[0],
  nextStep: () => {},
});

export default function SignupLayout({
  terms,
  identification,
  account,
  complete,
  children,
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

          <Otherwise>{children}</Otherwise>
        </Choose>
      </section>
    </StepContext.Provider>
  );
}
