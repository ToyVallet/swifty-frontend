'use client';

import { ImageWithFallback } from '@components/common';
import FalBackImg from '@images/fallback-festival.png';
import { formatDateRange } from '@swifty/shared-lib';
import { transition } from '@swifty/ui';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

import { type SearchResult } from '.';

const Link = motion(NextLink);

function Item({ item }: { item: SearchResult }) {
  return (
    <Link
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      whileTap={{ scale: 0.98, backgroundColor: '#1a1a1a' }}
      href={`/festival/${item.id}`}
      className="flex w-full items-center gap-[30px] p-2.5 rounded-xl"
    >
      <ImageWithFallback
        fallback={FalBackImg}
        src={item.thumbnailImagePath}
        alt={item.name}
        width={70}
        height={70}
        className="object-cover w-[70px] h-[70px] rounded-full"
      />
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-16 font-semibold">{item.name}</h2>
        <p className="text-16 font-medium">{item.description}</p>
        <p className="text-12 font-normal text-swifty-color-400 mt-1">
          {formatDateRange(item.startDate, item.endDate)}
        </p>
      </div>
    </Link>
  );
}

export default Item;
