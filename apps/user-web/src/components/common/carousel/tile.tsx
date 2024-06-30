import { ImageWithFallback, Link } from '@components/common';
import FallbackFestival from '@images/fallback-festival.png';
import type { Festival } from '@lib/types/festival';
import dayjs from 'dayjs';

export default function Tile({
  subId,
  name,
  addr,
  startDate,
  endDate,
  festivalImage,
  description,
  priority = false,
}: Festival & { priority?: boolean }) {
  const period = `${dayjs(startDate).format('YYYY.MM.DD')} - ${dayjs(endDate).format('YYYY.MM.DD')}`;
  return (
    <Link href={`/festival/${subId}`}>
      <div className="bg-black w-full max-w-[150px] text-white">
        <figure className="relative aspect-[3/4]">
          <ImageWithFallback
            className="absolute object-cover rounded-xl"
            src={festivalImage}
            alt={name}
            priority={priority}
            sizes="auto"
            fill
            fallback={FallbackFestival}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAA="
          />
        </figure>
        <div className="pt-[10px] flex flex-col items-between">
          <div className="h-12 w-[150px] font-bold truncate">
            <h4>{name}</h4>
            <p className="pt-1 truncate">{description}</p>
          </div>
          <p className="text-sm mt-[7px]">{addr}</p>
          <p className="text-gray-400 text-xs mt-[5px] gray-400 tracking-tight">
            {period}
          </p>
        </div>
      </div>
    </Link>
  );
}
