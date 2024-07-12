'use client';

import type { NonEmptyArrayReadOnly } from '@swifty/shared-lib';
import { createContext } from 'react';

type StepContextType<T extends NonEmptyArrayReadOnly<string>> = {
  currentStep: T[number];
  nextStep: () => void;
};

function createStepContext<T extends NonEmptyArrayReadOnly<string>>(steps: T) {
  return createContext<StepContextType<T>>({
    currentStep: steps[0],
    nextStep: () => {},
  });
}

export default createStepContext;
