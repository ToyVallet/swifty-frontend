import React, {
  type ComponentPropsWithoutRef,
  type Ref,
  Suspense,
  forwardRef,
} from 'react';

import { type IconNames, icons } from './icons';

interface IconProps
  extends Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height'> {
  name: IconNames;
  width: number;
  height: number;
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
    <Suspense
      fallback={<SkeletonIcon width={props.width} height={props.height} />}
    >
      <Component ref={ref} {...props} />
    </Suspense>
  );
});

export default Icon;

function SkeletonIcon({ width, height }: { width: number; height: number }) {
  return (
    <div
      style={{
        width,
        height,
        background:
          'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        animation: 'skeleton-loading 1.5s infinite linear',
        borderRadius: '4px',
      }}
    />
  );
}
