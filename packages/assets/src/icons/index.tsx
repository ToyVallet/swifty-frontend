import React, {
  type ComponentPropsWithoutRef,
  type Ref,
  Suspense,
  forwardRef,
} from 'react';

import { type IconNames, icons } from './icons';
import Skeleton from './skeleton';

interface IconProps
  extends Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height'> {
  name: IconNames;
  width?: number;
  height?: number;
}

const Icon = forwardRef(function Icon(
  { name, ...props }: IconProps,
  ref: Ref<SVGSVGElement>,
) {
  const Component = icons[name];

  if (!Component) {
    return null;
  }

  return (
    <Suspense fallback={<Skeleton width={props.width} height={props.height} />}>
      <Component ref={ref} {...props} />
    </Suspense>
  );
});

export default Icon;
