'use client';

import { cn } from '@swifty/shared-lib';
import { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

interface IndicatorProps {
  cur: number;
  total: number;
}

function Indicator({ cur, total }: IndicatorProps) {
  return (
    <div className="absolute bottom-[55px] right-4 bg-black text-white font-bold text-xs px-2.5 py-[1px] rounded-lg">
      {`${cur + 1} / ${total}`}
    </div>
  );
}

interface CarouselProps extends EmblaOptionsType {
  children?: React.ReactNode;
  hasIndicator?: boolean;
  className?: string;
  autoplay?: boolean;
}

function Carousel({
  children,
  className,
  hasIndicator = false,
  align = 'start',
  skipSnaps = true,
  autoplay = false,
  duration = 3000,
  loop = true,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align,
      skipSnaps,
      loop,
    },
    [
      Autoplay({
        playOnInit: autoplay,
        delay: duration,
        stopOnMouseEnter: true,
      }),
    ],
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
      emblaApi.on('select', onSelect);
      setCurrentIndex(emblaApi.selectedScrollSnap());
      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi]);

  return (
    <div className="h-full w-full relative" ref={emblaRef}>
      <div className={cn('flex h-full w-full', className)}>{children}</div>
      {hasIndicator && Array.isArray(children) && (
        <Indicator cur={currentIndex} total={children.length} />
      )}
    </div>
  );
}

export default Carousel;
