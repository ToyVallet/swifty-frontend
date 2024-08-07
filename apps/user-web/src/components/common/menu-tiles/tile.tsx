import { cn } from '@swifty/shared-lib';

import type { TileInfo } from './index';

export default function Tile({
  bgColor,
  subtitle,
  icon,
  title,
  textColor,
}: TileInfo) {
  return (
    <div
      className={cn(
        'rounded-xl h-full w-full border-[1px] border-neutral-300 dark:border-neutral-800 p-4 flex flex-col justify-between shadow-xl dark:shadow-none active:scale-[0.98] transition-transform duration-200 ease-in-out aspect-square',
        bgColor,
        textColor,
      )}
    >
      <div className="text-12 font-light flex w-full items-center justify-between lg:text-18">
        <span className="text-12 font-medium">{subtitle}</span>
        {icon}
      </div>
      {title}
    </div>
  );
}
