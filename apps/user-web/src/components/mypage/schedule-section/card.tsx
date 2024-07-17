import { type LineUp } from '@lib/types';
import Image, { type StaticImageData } from 'next/image';

type CardProps = {
  title: string;
  date: string;
  lineups: LineUp[];
  enterAt: Date;
  backgroundImage: StaticImageData | string;
};

export default function Card({
  title,
  date,
  lineups,
  enterAt,
  backgroundImage,
}: CardProps) {
  return (
    <div className="w-full rounded-xl p-5 relative overflow-hidden bg-contain bg-center bg-no-repeat bg-gradient-to-t from-[#001235] to-transparent">
      <div className="flex flex-col gap-[10px] text-white">
        <h4 className="text-22 font-bold">{title}</h4>
        <p className="text-12 font-normal">{date}</p>
      </div>
      <div className="mt-[51px] flex items-center justify-between">
        <div>라인업 보기</div>
        <div className="font-semibold text-14 text-primary">입장 10분 전</div>
      </div>
      <Image
        src={backgroundImage}
        alt="background"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
      />
    </div>
  );
}
