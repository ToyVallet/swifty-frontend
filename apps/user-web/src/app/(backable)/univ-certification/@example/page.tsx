'use client';

import { CertificationStepContext } from '@app/(backable)/univ-certification/context';
import { FixedBottomCTA } from '@components/common';
import { ExampleImgage, UnivSearch } from '@components/univ-certification';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

export default function ExamplePage() {
  const { nextStep } = useContext(CertificationStepContext);
  const form = useFormContext();
  const { getFieldState } = form;
  const university = getFieldState('universityId');

  return (
    <>
      <div className="flex flex-col gap-5 overflow-y-scroll scrollbar-hide">
        <UnivSearch />
        <ExampleImgage />
      </div>
      <FixedBottomCTA
        onClick={nextStep}
        disabled={!university.isDirty && !university.error}
      >
        다음
      </FixedBottomCTA>
    </>
  );
}
