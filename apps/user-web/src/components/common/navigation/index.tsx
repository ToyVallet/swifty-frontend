import { BackButton } from '@components/common';
import { Icon } from '@swifty/assets';
import { cn } from '@swifty/shared-lib';
import { Choose, If, When } from '@swifty/ui';
import { cva } from 'class-variance-authority';

import Column from './column';
import LogoLink from './logo-link';

type NavigationProps = {
  variant?: 'root' | 'back';
  bg?: 'transparent' | 'gradient' | 'solid' | 'blur';
  centerLogo?: boolean;
  title?: string;
};

const navigationVariants = cva(
  'z-30 grid w-full px-5 h-[50px] fixed top-0 left-0',
  {
    variants: {
      bg: {
        transparent: 'bg-transparent',
        gradient: 'bg-gradient-to-b from-black to-transparent',
        solid: 'bg-black',
        blur: 'bg-transparent backdrop-blur-md backdrop-filter',
      },
      centerLogo: {
        true: 'grid-cols-3',
        false: 'grid-cols-2',
      },
    },
    defaultVariants: {
      bg: 'transparent',
    },
  },
);

export default function Navigation({
  title,
  variant = 'back',
  bg = 'transparent',
  centerLogo = false,
}: NavigationProps) {
  return (
    <nav className={cn(navigationVariants({ bg, centerLogo }))}>
      <Column>
        <Choose value={variant}>
          <When value="root">
            <LogoLink />
          </When>
          <When value="back">
            <BackButton className="text-white flex items-center gap-2.5">
              <Icon name="arrow-left" width={40} height={40} />
              {title && <span className="font-bold text-16">{title}</span>}
            </BackButton>
          </When>
        </Choose>
      </Column>

      <If condition={centerLogo}>
        <Column>
          <LogoLink />
        </Column>
      </If>
    </nav>
  );
}
