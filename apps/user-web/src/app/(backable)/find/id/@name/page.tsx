'use client';

import { FixedBottomCTA } from '@components/common';
import { Name } from '@components/signup/identification';
import useIsDisabled from '@hooks/use-is-disabled';
import { useContext } from 'react';

import { FindIdContext } from '../context';

export default function Page() {
  const isDisabled = useIsDisabled('name');

  const { nextStep } = useContext(FindIdContext);

  return (
    <>
      <Name />
      <FixedBottomCTA disabled={isDisabled} onClick={nextStep}>
        확인
      </FixedBottomCTA>
    </>
  );
}
