import { Icon } from '@swifty/assets';

export default function MainLogo() {
  return (
    <header className="flex flex-col items-center justify-center gap-1">
      <Icon
        name="swifty-full-logo"
        className="mt-[162px] fill-black dark:fill-white"
        height={53}
      />
      <h1 className="text-22 font-bold">입장 관리 시스템</h1>
    </header>
  );
}
