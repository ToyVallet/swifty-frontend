import { Main } from '@components/common';
import TicketWating from '@images/ticket/ticket-wating.gif';
import Image from 'next/image';

export default function TicketWaitPage() {
  // SSE를 활용한 연결 로직 추가 필요
  return (
    <Main className="mt-[127px]">
      <Image src={TicketWating} height={255} width={255} alt="waiting" />
    </Main>
  );
}
