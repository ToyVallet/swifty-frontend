'use client';

import { FadeOverlay, ImageWithFallback } from '@components/common';
import FallbackHero from '@images/fallback-hero.png';
import { type LineUp } from '@lib/types';
import { type StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';

type CardProps = {
  title: string;
  date: string;
  lineups: LineUp[];
  enterAt: string;
  backgroundImage: StaticImageData | string;
  ticketId: string;
  festivalId: string;
};

export default function Card({
  title,
  date,
  lineups,
  enterAt,
  backgroundImage,
  ticketId,
  festivalId,
}: CardProps) {
  const router = useRouter();

  const onNavigateFestival = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/festival/${festivalId}`);
  };
  const onNavigateTicketDetail = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/ticket`);
  };
  return (
    <div
      className="w-full rounded-xl p-5 relative overflow-hidden "
      onClick={onNavigateTicketDetail}
    >
      <ImageWithFallback
        src={backgroundImage}
        alt="background"
        className="z-10 object-cover"
        fill
        fallback={FallbackHero}
      />
      <FadeOverlay className="z-20" />
      <div className="flex flex-col gap-[10px] z-20 relative">
        <h4 className="text-22 font-bold">{title}</h4>
        <p className="text-12 font-normal">{date}</p>
      </div>
      <div className="mt-[51px] flex items-center justify-between z-20 relative">
        <div onClick={onNavigateFestival}>라인업 보기</div>
        <div className="font-bold text-14 text-primary">{enterAt}</div>
      </div>
    </div>
  );
}
