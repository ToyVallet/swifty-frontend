import { ThemeToggle } from '@components/common';

type UserBarProps = {
  username: string;
};

export default function UserBar({ username }: UserBarProps) {
  return (
    <div className="w-full flex items-center justify-between  pt-[15px] pb-[10px]">
      <h2 className="text-26 font-semibold">{`${username} 님`}</h2>
      <ThemeToggle />
    </div>
  );
}
