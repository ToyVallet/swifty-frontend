'use client';

import { FixedBottomCTA } from '@components/common';
import { Id, Password } from '@components/signup/account';
import { useContext } from 'react';

import { StepContext } from '../context';

export default function AccountPage() {
  const { nextStep } = useContext(StepContext);

  const onNext = () => {
    nextStep();
  };

  return (
    <>
      <section className="flex flex-col gap-5">
        <Password />
        <Id />
      </section>
      <FixedBottomCTA type="button" onClick={onNext}>
        다음
      </FixedBottomCTA>
    </>
  );
}
