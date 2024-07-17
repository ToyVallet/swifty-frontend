import { FadeOverlay, ImageWithFallback } from '@components/common';
import FallbackHero from '@images/fallback-hero.png';
import type { Festival } from '@lib/types/festival';
import { formatDateRange } from '@swifty/shared-lib';
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
      className="relative flex-[0_0_100%] overflow-hidden *:text-white"
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

      <div className="absolute bottom-[60px] left-5 right-[74px] h-[114px]">
        <span className="text-12">{addr}</span>
        <h4 className="font-bold text-22 mt-[3px]">{name}</h4>
        <span className="block truncate text-20 font-semibold">
          {description}
        </span>
        <span className="mt-[6px] text-14">
          {formatDateRange(startDate, endDate)}
        </span>
      </div>
    </Link>
  );
}
