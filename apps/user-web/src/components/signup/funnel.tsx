'use client';

import { cn } from '@swifty/shared-lib';
import { type NonEmptyArray } from '@swifty/shared-lib';
import { motion } from 'framer-motion';
import { Children, type ReactElement, isValidElement, useEffect } from 'react';

import { variants } from './motion';

export type StepType = Readonly<NonEmptyArray<string>>;

interface StepProps<Steps extends StepType> {
  step: Steps[number];
  onEnter?: () => void;
  children: React.ReactNode;
  className?: string;
}

interface FunnelProps<Steps extends StepType> {
  steps: Steps;
  step: Steps[number];
  children: ReactElement<typeof StepComponent>[];
  accumulate?: boolean;
}

export default function Funnel<Steps extends StepType>({
  step,
  steps,
  children,
  accumulate = true,
}: FunnelProps<Steps>) {
  const currentStep = steps.indexOf(step);

  if (currentStep === -1) {
    throw new Error(`Step "${step}" does not exist in the funnel`);
  }

  const validChildren = Children.toArray(children).filter((child) =>
    isValidElement(child),
  );

  if (accumulate) {
    const stepElements = steps
      .slice(0, currentStep + 1)
      .map((step) => {
        const child = validChildren.find(
          (child) =>
            (child as React.ReactElement<StepProps<Steps>>).props.step === step,
        );
        return child;
      })
      .reverse();

    return <>{stepElements}</>;
  } else {
    return (
      validChildren.find(
        (child) =>
          (child as React.ReactElement<StepProps<Steps>>).props.step === step,
      ) ?? null
    );
  }
}

export const StepComponent = <Steps extends StepType>({
  onEnter,
  children,
  className,
}: StepProps<Steps>) => {
  useEffect(() => {
    onEnter?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      // variants={variants}
      // initial="hidden"
      // animate="visible"
      // exit="hidden"
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  );
};

Funnel.Step = StepComponent;
