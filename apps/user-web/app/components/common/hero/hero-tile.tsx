import { ImageWithFallback } from '@components/common';
import FallbackHero from '@images/fallback-hero.png';
import { Link } from '@lib/navigation';
import type { FestivalInfo } from '@lib/types';
import formatDate from '@lib/utils/parser/format-date';

export default function HeroTile({
  id,
  addr,
  name,
  startdate,
  enddate,
  description,
  festivalimage,
  priority = false,
}: FestivalInfo & { priority?: boolean }) {
  return (
    <Link
      href={`/festival/${id}`}
      className="relative flex-[0_0_100%] overflow-hidden"
    >
      <div className="aspect-square relative h-full w-full flex items-center justify-center">
        <ImageWithFallback
          className="object-cover"
          src={festivalimage || ''}
          alt={name}
          quality={100}
          priority={priority}
          sizes="auto"
          fill
          fallback={FallbackHero}
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-hero-carousel" />
      </div>

      <div className="absolute bottom-[60px] left-5 right-[74px] h-[114px] text-xl font-semibold">
        <span className="mt-[3px] text-xs leading-[18px] tracking-[-0.36px]">
          {addr}
        </span>
        <h4 className="font-bold text-[22px] leading-[33px] tracking-[-0.66px]">
          {name}
        </h4>
        <span className="block leading-[30px] tracking-[-0.6px] truncate">
          {description}
        </span>
        <span className="mt-[6px] text-sm tracking-[-0.42px]">
          {formatDate(startdate, enddate, 'ko')}
        </span>
      </div>
    </Link>
  );
}
