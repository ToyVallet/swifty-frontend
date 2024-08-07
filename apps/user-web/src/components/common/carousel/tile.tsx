import { ImageWithFallback } from '@components/common';
import FallbackFestival from '@images/fallback-festival.png';
import type { Festival } from '@lib/types/festival';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function Tile({
  id,
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
    <Link href={`/festival/${id}`}>
      <div className=" w-full max-w-[150px]">
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
          <p className="text-14 text-swifty-color-700 dark:text-swifty-color-100  mt-[7px]">
            {addr}
          </p>
          <p className="text-swifty-color-500 dark:text-swifty-color-400  text-12 mt-[5px] gray-400 tracking-tight">
            {period}
          </p>
        </div>
      </div>
    </Link>
  );
}
