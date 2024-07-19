import { BackButton } from '@components/common';
import { Icon } from '@swifty/assets';
import { cn } from '@swifty/shared-lib';
import { cva } from 'class-variance-authority';

import Column from './column';

type NavigationProps = {
  left?: React.FC;
  center?: React.FC;
  right?: React.FC;
  bg?: 'transparent' | 'gradient' | 'solid' | 'blur';
  title?: string;
};

const navigationVariants = cva(
  'z-30 grid w-full px-5 h-[50px] fixed top-0 left-0 grid-cols-3',
  {
    variants: {
      bg: {
        gradient: 'bg-gradient-to-b from-black to-transparent',
        transparent: 'bg-transparent',
        solid: 'bg-black',
        blur: 'bg-transparent backdrop-blur-md backdrop-filter',
      },
    },
    defaultVariants: {
      bg: 'gradient',
    },
  },
);

export default function Navigation({
  title,
  left,
  center,
  right,
  bg = 'gradient',
}: NavigationProps) {
  const Left =
    left != null
      ? left
      : () => (
          <BackButton
            prefix={
              <Icon
                name="arrow-left"
                className="-translate-x-2.5"
                width={40}
                height={40}
              />
            }
          >
            {title && <span className="font-bold text-16">{title}</span>}
          </BackButton>
        );
  const Center = center != null ? center : () => null;
  const Right = right != null ? right : () => null;

  return (
    <nav className={cn(navigationVariants({ bg }))}>
      <Column>
        <Left />
      </Column>
      <Column>
        <Center />
      </Column>
      <Column>
        <Right />
      </Column>
    </nav>
  );
}

export { default as LogoLink } from './logo-link';
