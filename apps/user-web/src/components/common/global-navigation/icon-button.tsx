import { Icon, type IconNames } from '@swifty/assets';
import Link from 'next/link';

type IconButtonProps = {
  link: string;
  iconName: IconNames;
  label: string;
};

export default function IconButton({ link, iconName, label }: IconButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center text-white w-full">
      <Link
        href={link}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center w-[30px] h-[30px]">
          <Icon name={iconName} width={30} height={30} />
        </div>
        <span className="text-10 font-semibold">{label}</span>
      </Link>
    </div>
  );
}
