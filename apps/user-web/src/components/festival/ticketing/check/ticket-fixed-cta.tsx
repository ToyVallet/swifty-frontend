'use client';

import { TicketingStepContext } from '@app/(backable)/festival/[id]/ticketing/context';
import { FixedBottomCTA, GoogleCaptcha } from '@components/common';
import { Button, Drawer, DrawerContent, DrawerTrigger } from '@swifty/ui';
import { useContext, useState } from 'react';

export default function TicketFixedCta() {
  const { nextStep } = useContext(TicketingStepContext);
  const [open, setOpen] = useState(false);
  const onClick = () => {};
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <FixedBottomCTA onClick={onClick}>티켓 예매하기</FixedBottomCTA>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full flex justify-center items-center py-10">
            <GoogleCaptcha nextStep={nextStep} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
