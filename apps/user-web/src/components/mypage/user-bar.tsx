import BellIcon from '@icons/mypage/bell.svg';
import Link from 'next/link';

type UserBarProps = {
  username: string;
};

export default function UserBar({ username }: UserBarProps) {
  return (
    <div className="w-full flex items-center justify-between text-white pt-[15px] pb-[10px]">
      <h2 className="text-26 font-semibold">{`${username} 님`}</h2>
      <Link href="/notification">
        <BellIcon className="w-10 h-10" />
      </Link>
    </div>
  );
}
