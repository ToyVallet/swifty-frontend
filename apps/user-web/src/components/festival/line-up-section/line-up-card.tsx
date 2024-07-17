import { ImageWithFallback } from '@components/common';
import FallbackHero from '@images/fallback-hero.png';
import type { LineUp } from '@lib/types';

type LineUpCardProps = {
  lineup: LineUp;
};

export default function LineUpCard({ lineup }: LineUpCardProps) {
  return (
    <div className="flex flex-col gap-[10px] aspect-[7/4] w-full">
      <ImageWithFallback
        fallback={FallbackHero}
        src={lineup.lineUpImagePath}
        alt={lineup.title}
        className="object-cover rounded-xl aspect-[7/4] w-full"
        width={353}
        height={215}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-18 font-bold">{lineup.title}</h2>
        <span className="text-12 font-[400] text-gray-400">
          {lineup.performanceTime}
        </span>
      </div>
    </div>
  );
}
