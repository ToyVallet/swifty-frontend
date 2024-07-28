'use client';

import { FixedBottomCTA } from '@components/common';
import { Id } from '@components/signup/account';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FindPasswordContext } from '../context';

export default function Page() {
  const form = useFormContext();
  const { invalid, isDirty } = form.getFieldState('id');
  const { nextStep } = useContext(FindPasswordContext);

  return (
    <>
      <Id />
      <FixedBottomCTA disabled={invalid || !isDirty} onClick={nextStep}>
        확인
      </FixedBottomCTA>
    </>
  );
}
