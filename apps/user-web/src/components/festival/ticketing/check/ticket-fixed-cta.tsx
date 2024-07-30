'use client';

import { TicketingStepContext } from '@app/(backable)/festival/[id]/ticketing/context';
import { FixedBottomCTA, GoogleCaptcha } from '@components/common';
import { http } from '@swifty/shared-lib';
import { Drawer, DrawerContent, DrawerTrigger } from '@swifty/ui';
import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function TicketFixedCta() {
  const { nextStep } = useContext(TicketingStepContext);
  const [open, setOpen] = useState(false);
  const [isSucess, setIsSucess] = useState(false);
  const form = useFormContext();
  const onSucess = () => {
    setIsSucess(true);
  };

  useEffect(() => {
    if (isSucess) {
      http
        .post<{
          id: string;
        }>(
          '/ticketing',
          { scheduleId: form.getValues('scheduleId') },
          { credentials: 'include' },
        )
        .then((data) => {
          form.setValue('ticketId', data.id);
          nextStep();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isSucess]);
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <FixedBottomCTA>티켓 예매하기</FixedBottomCTA>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full flex justify-center items-center py-10">
            <GoogleCaptcha onSucess={onSucess} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
