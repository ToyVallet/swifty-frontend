'use client';

import { Main } from '@components/common';
import { Header } from '@components/signup';
import TicketWating from '@images/ticket/ticket-wating.gif';
import type { Params } from '@swifty/shared-lib';
import { convertNewlineToJSX } from '@toss/react';
import Image from 'next/image';
import { useEffect } from 'react';

type TicketingResultPageProps = Params<{ id: string }>;

export default function TicketWaitPage({
  params: { id },
}: TicketingResultPageProps) {
  // SSE를 활용한 연결 로직 추가 필요'

  useEffect(() => {
    const eventSource = new EventSource(
      `https://swifty.kr/api/ticketing/subscribe/${id}`,
    );
    const onMessage = (ev: MessageEvent) => {
      console.log(ev);
    };

    const onError = (ev: Event) => {
      console.log(ev);
    };
    eventSource.onmessage = onMessage;
    eventSource.onerror = onError;
    return () => eventSource.close();
  }, []);
  return (
    <main className="h-full flex flex-col relative pb-20 overflow-y-auto scrollbar-hide mt-[47px]">
      <Header>
        {convertNewlineToJSX('티켓 예매가 진행중이에요\n 잠시만 기다려주세요')}
      </Header>
      <Main className="mt-[127px]">
        <Image src={TicketWating} height={255} width={255} alt="waiting" />
      </Main>
      <p className="text-14 font-medium">
        {convertNewlineToJSX(
          '새로고침 하거나 화면에서 벗어날 경우\n티켓팅이 정상적으로 진행되지 않을 수 있습니다.',
        )}
      </p>
    </main>
  );
}
