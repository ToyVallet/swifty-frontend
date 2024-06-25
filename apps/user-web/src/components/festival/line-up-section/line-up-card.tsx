import { parseFestivalDate } from '@lib/utils';
import dayjs from 'dayjs';
import Image from 'next/image';

type LineUpCardProps = {
  lineup: any;
};

export default function LineUpCard({ lineup }: LineUpCardProps) {
  return (
    <div className="flex flex-col gap-[10px] aspect-[7/4] w-full">
      <Image
        src={lineup.image}
        alt={lineup.name}
        className="object-cover rounded-xl aspect-[7/4] w-full"
        width={353}
        height={215}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{lineup.name}</h2>
        <span className="text-xs font-[400] text-gray-400">{`${dayjs(lineup.date).format('YYYY.MM.DD')} - ${parseFestivalDate(lineup.performance_day)}일차`}</span>
      </div>
    </div>
  );
}
