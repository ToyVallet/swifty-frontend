'use client';

import type { TicketingDate } from '@app/(backable)/festival/[id]/ticketing/@date/page';
import { TicketingStepContext } from '@app/(backable)/festival/[id]/ticketing/context';
import { FixedBottomGroup } from '@components/common';
import DateSelect from '@components/festival/ticketing/date-select';
import { Button } from '@swifty/ui';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  ticketings: TicketingDate[];
};

export default function TicketingDateFixedButtonGroup({ ticketings }: Props) {
  const { nextStep } = useContext(TicketingStepContext);
  const form = useFormContext();
  const { invalid, isDirty } = form.getFieldState('scheduleId');
  const isDisabled = invalid || !isDirty;
  return (
    <FixedBottomGroup className="gap-5">
      <DateSelect options={ticketings} />
      <Button
        block
        variant={isDisabled ? 'white' : 'primary'}
        disabled={isDisabled}
        onClick={nextStep}
      >
        {isDisabled ? '구역을 선택해주세요' : '확인'}
      </Button>
    </FixedBottomGroup>
  );
}
