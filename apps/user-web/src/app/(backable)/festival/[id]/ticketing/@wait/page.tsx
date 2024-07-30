'use client';

import { Main } from '@components/common';
import TicketWating from '@images/ticket/ticket-wating.gif';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function TicketWaitPage() {
  // SSE를 활용한 연결 로직 추가 필요'
  const form = useFormContext();
  const ticketId = form.getValues('ticketId');
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      if (ticketId) {
        router.push(`/ticketing-result/${ticketId}`);
      }
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  return (
    <Main className="mt-[127px]">
      <Image src={TicketWating} height={255} width={255} alt="waiting" />
    </Main>
  );
}
