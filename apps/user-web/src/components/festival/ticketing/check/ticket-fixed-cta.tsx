'use client';

import { FixedBottomCTA, GoogleCaptcha } from '@components/common';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { APIError, http } from '@swifty/shared-lib';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@swifty/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

export default function TicketFixedCta() {
  const router = useRouter();
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
          const ticketId = data.id;
          router.replace(`/ticketing-result/${ticketId}/loading`);
        })
        .catch((err) => {
          if (APIError.isAPIError(err)) {
            toast.error(err.message);
          } else {
            toast.error('인증에 실패했습니다. 다시 시도해주세요');
          }
        })
        .finally(() => {
          setIsSucess(false);
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
        <VisuallyHidden.Root>
          <DrawerTitle>Google Recaptcha</DrawerTitle>
          <DrawerDescription>Check Google Recaptcha</DrawerDescription>
        </VisuallyHidden.Root>
      </Drawer>
    </>
  );
}
