import { Icon } from '@swifty/assets';

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center px-20 pb-[54px] gap-[26px]">
      <span className="text-18 font-bold text-swifty-color-600">
        스태프 외 유저는 조작을 삼가해 주세요
      </span>
      <Icon
        name="using-ticket/swifty-samll-logo"
        width={115}
        height={36}
        className="fill-black dark:fill-white"
      />
    </footer>
  );
}
