import type { IconNames } from '@swifty/assets';
import { Icon } from '@swifty/assets';
import type { ComponentPropsWithoutRef } from 'react';

interface IconProps
  extends Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height'> {
  name: IconNames;
  width?: number;
  height?: number;
}

export default function FacePassTermIcon(props: IconProps) {
  return (
    <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full dark:bg-black bg-white text-center">
      <Icon {...props} />
    </div>
  );
}
