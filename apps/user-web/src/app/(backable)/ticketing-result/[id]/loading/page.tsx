import { Main } from '@components/common';
import { Header } from '@components/signup';
import TicketWating from '@images/ticket/ticket-wating.gif';
import type { Params } from '@swifty/shared-lib';
import { convertNewlineToJSX } from '@toss/react';
import Image from 'next/image';

type TicketingResultPageProps = Params<{ id: string }>;

export default async function TicketWaitPage({
  params: { id },
}: TicketingResultPageProps) {
  // SSE를 활용한 연결 로직 추가 필요'
  console.log(id);

  return (
    <main className="h-full flex flex-col relative pb-20 overflow-y-auto scrollbar-hide mt-[47px]">
      <Header>
        {convertNewlineToJSX('티켓 예매가 진행중이에요\n 잠시만 기다려주세요')}
      </Header>
      <Main className="mt-[127px]">
        <Image src={TicketWating} height={255} width={255} alt="waiting" />
      </Main>
    </main>
  );
}
