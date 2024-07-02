'use client';

import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useCallback,
  useState,
} from 'react';

type SignupLayoutProps = PropsWithChildren<{ terms: ReactNode }>;

export const steps = ['약관 동의가 필요해요', '성함을 알려주세요'] as const;

export type Step = (typeof steps)[number];

export const StepContext = createContext<{
  currentStep: Step;
  nextStep: () => void;
}>({
  currentStep: steps[0],
  nextStep: () => {},
});

export default function SignupLayout({ children, terms }: SignupLayoutProps) {
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);

  const nextStep = useCallback(() => {
    const nextStepIndex = steps.indexOf(currentStep) + 1;

    if (steps[nextStepIndex]) {
      setCurrentStep(steps[nextStepIndex] as Step);
    }
  }, []);

  return (
    <StepContext.Provider value={{ currentStep, nextStep }}>
      <section className="h-full flex flex-col justify-between relative">
        <h1 className="text-white text-center font-bold text-26 my-10">
          {currentStep}
        </h1>
        {children}
        {terms}
      </section>
    </StepContext.Provider>
  );
}
