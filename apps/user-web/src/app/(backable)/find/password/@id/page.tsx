'use client';

import { FixedBottomCTA } from '@components/common';
import { Id } from '@components/signup/account';
import { useIsDisabled } from '@hooks/index';
import { useContext } from 'react';

import { FindPasswordContext } from '../context';

export default function Page() {
  const { nextStep } = useContext(FindPasswordContext);
  const isDisabled = useIsDisabled('id');
  return (
    <>
      <Id />
      <FixedBottomCTA disabled={isDisabled} onClick={nextStep}>
        확인
      </FixedBottomCTA>
    </>
  );
}
