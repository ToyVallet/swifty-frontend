'use client';

import { TicketingStepContext } from '@app/(backable)/festival/[id]/ticketing/context';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { useContext } from 'react';

type TicketingTopCardProps = {
  title: string;
  description: string;
  iconSrc?: string;
};

export default function TicketingCheckTopCard({
  title,
  description,
  iconSrc,
}: TicketingTopCardProps) {
  const { currentStep } = useContext(TicketingStepContext);
  return (
    <section className="w-full">
      <h1 className="font-bold text-20 mb-[30px]">{currentStep}</h1>
      <div className="flex justify-between w-full">
        <div className="h-full flex flex-col items-start justify-start font-semibold">
          <span className="text-12 font-semibold mb-[3px]">예정된 축제</span>
          <h1 className="text-22 font-bold mb-[3px] uppercase">{title}</h1>
          <h1 className="text-22 font-bold mb-[6px]">{description}</h1>
        </div>

        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage src={iconSrc} alt="avatar" />
          <AvatarFallback className=" bg-swifty-color-900 text-white">
            이미지 없음
          </AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}
