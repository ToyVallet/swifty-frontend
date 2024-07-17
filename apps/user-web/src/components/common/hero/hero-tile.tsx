import { FadeOverlay, ImageWithFallback } from '@components/common';
import FallbackHero from '@images/fallback-hero.png';
import type { Festival } from '@lib/types/festival';
import formatDate from '@lib/utils/parser/format-date';
import Link from 'next/link';

export default function HeroTile({
  id,
  addr,
  name,
  startDate,
  endDate,
  description,
  festivalImage,
  priority = false,
}: Festival & { priority?: boolean }) {
  return (
    <Link
      href={`/festival/${id}`}
      className="relative flex-[0_0_100%] overflow-hidden"
    >
      <div className="aspect-square relative h-full w-full flex items-center justify-center">
        <ImageWithFallback
          className="object-cover"
          src={festivalImage}
          alt={name}
          quality={100}
          priority={priority}
          sizes="auto"
          fill
          fallback={FallbackHero}
        />
        <FadeOverlay />
      </div>

      <div className="absolute bottom-[60px] left-5 right-[74px] h-[114px] text-20 font-semibold">
        <span className="mt-[3px] text-12 leading-[18px] tracking-[-0.36px]">
          {addr}
        </span>
        <h4 className="font-bold text-[22px] leading-[33px] tracking-[-0.66px]">
          {name}
        </h4>
        <span className="block leading-[30px] tracking-[-0.6px] truncate">
          {description}
        </span>
        <span className="mt-[6px] text-14 tracking-[-0.42px]">
          {formatDate(startDate, endDate, 'ko')}
        </span>
      </div>
    </Link>
  );
}
