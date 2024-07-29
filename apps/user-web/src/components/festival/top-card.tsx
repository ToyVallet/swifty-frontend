import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type TopCardProps = {
  title: string;
  description: string;
  period: string;
  iconSrc?: string;
};

export default function TopCard({
  title,
  description,
  period,
  iconSrc,
}: TopCardProps) {
  return (
    <section className="flex justify-between w-full">
      <div className="h-full flex flex-col items-start justify-start font-semibold">
        <span className="text-12 mb-[3px]">축제 홈</span>
        <h1 className="text-[22px] font-bold mb-[3px] uppercase">{title}</h1>
        <h1 className="text-[22px] font-bold mb-[6px]">{description}</h1>
        <p className="text-14">{period}</p>
      </div>
      <Avatar className="w-[100px] h-[100px]">
        <AvatarImage src={iconSrc} alt="avatar" />
        <AvatarFallback className=" bg-swifty-color-900 text-white">
          이미지 없음
        </AvatarFallback>
      </Avatar>
    </section>
  );
}
