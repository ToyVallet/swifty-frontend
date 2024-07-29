'use client';

import { TicketingStepContext } from '@app/(backable)/festival/[id]/ticketing/context';
import { FixedBottomCTA } from '@components/common';
import { useContext } from 'react';

export default function TicketFixedCta() {
  const { currentStep, nextStep } = useContext(TicketingStepContext);
  const onClick = () => {};
  return (
    <>
      <FixedBottomCTA onClick={onClick}>티켓 예매하기</FixedBottomCTA>
    </>
  );
}
