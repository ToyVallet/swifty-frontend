'use client';

import { Navigation } from '@components/common';
import { Choose, When } from '@swifty/ui';
import type { ReactNode } from 'react';
import { type PropsWithChildren, useState } from 'react';

import { FacePassContext, type FacePassStep, facepassStep } from './context';

type Props = PropsWithChildren<{
  camera: ReactNode;
  start: ReactNode;
}>;

export default function FacePassLayout({ camera, start }: Props) {
  const [currentStep, setCurrentStep] = useState<FacePassStep>(facepassStep[0]);
  const nextStep = () => {
    const nextStepIndex = facepassStep.indexOf(currentStep) + 1;

    if (facepassStep[nextStepIndex] !== undefined) {
      setCurrentStep(facepassStep[nextStepIndex]);
    }
  };

  return (
    <div className="w-dvw h-dvh px-5">
      <Navigation title="돌아가기" bg="blur" />
      <div className="pt-10">
        <FacePassContext.Provider value={{ currentStep, nextStep }}>
          <Choose value={currentStep}>
            <When value="start">{start}</When>
            <When value="camera">{camera}</When>
          </Choose>
        </FacePassContext.Provider>
      </div>
    </div>
  );
}
