'use client';

import type { NonEmptyArray } from '@swifty/shared-lib';
import { createContext } from 'react';

type StepContextType<T extends Readonly<NonEmptyArray<string>>> = {
  currentStep: T[number];
  nextStep: () => void;
};

function createStepContext<T extends Readonly<NonEmptyArray<string>>>(
  steps: T,
) {
  return createContext<StepContextType<T>>({
    currentStep: steps[0],
    nextStep: () => {},
  });
}

export default createStepContext;
