'use client';

import { FixedBottomCTA } from '@components/common';
import { Name } from '@components/signup/identification';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FindIdContext } from '../context';

export default function Page() {
  const form = useFormContext();
  const { invalid } = form.getFieldState('name');
  const { nextStep } = useContext(FindIdContext);

  return (
    <>
      <Name />
      <FixedBottomCTA disabled={invalid} onClick={nextStep}>
        확인
      </FixedBottomCTA>
    </>
  );
}
