'use client';

import { CertificationStepContext } from '@app/(backable)/univ-certification/context';
import { FixedBottomCTA } from '@components/common';
import { ExampleImgage, UnivSearch } from '@components/univ-certification';
import { useContext } from 'react';

export default function ExamplePage() {
  const { nextStep } = useContext(CertificationStepContext);
  return (
    <>
      <div className="flex flex-col gap-5 overflow-y-scroll scrollbar-hide">
        <UnivSearch />
        <ExampleImgage />
      </div>
      <FixedBottomCTA onClick={nextStep}>다음</FixedBottomCTA>
    </>
  );
}
