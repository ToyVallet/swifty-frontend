'use client';

import { Main } from '@components/common';
import { Header } from '@components/signup';
import { useEventSoure } from '@hooks/index';
import TicketWating from '@images/ticket/ticket-wating.gif';
import { convertNewlineToJSX } from '@toss/react';
import Image from 'next/image';

type Props = {
  id: string;
};

export default function TicketingWait({ id }: Props) {
  useEventSoure(id);
  return (
    <main className="h-full flex flex-col items-center relative pb-20 overflow-y-auto scrollbar-hide mt-[47px]">
      <Header>
        {convertNewlineToJSX('티켓 예매가 진행중이에요\n 잠시만 기다려주세요')}
      </Header>
      <Main className="mt-[127px]">
        <Image src={TicketWating} height={255} width={255} alt="waiting" />
      </Main>
      <p className="text-14 font-medium text-center mt-6">
        {convertNewlineToJSX(
          '새로고침 하거나 화면에서 벗어날 경우\n티켓팅이 정상적으로 진행되지 않을 수 있습니다.',
        )}
      </p>
    </main>
  );
}
