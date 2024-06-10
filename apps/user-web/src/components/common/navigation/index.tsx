import { BackButton } from '@components/common';
import LeftArrow from '@icons/left-arrow.svg';
import { cn } from '@swifty/shared-lib';
import { Choose, If, When } from '@swifty/ui';
import { cva } from 'class-variance-authority';

import Column from './column';
import LogoLink from './logo-link';
import SearchButton from './search-button';

type NavigationProps = {
  variant?: 'root' | 'back';
  bg?: 'transparent' | 'gradient' | 'solid';
  search?: boolean;
  centerLogo?: boolean;
  title?: string;
};

const navigationVariants = cva(
  'z-30 grid grid-cols-3 w-full px-5 h-[50px] fixed top-0',
  {
    variants: {
      bg: {
        transparent: 'bg-transparent',
        gradient: 'bg-gradient-to-b from-black to-transparent',
        solid: 'bg-black',
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
  search = false,
  centerLogo = false,
}: NavigationProps) {
  return (
    <nav className={cn(navigationVariants({ bg }))}>
      <Column>
        <Choose value={variant}>
          <When value="root">
            <LogoLink />
          </When>
          <When value="back">
            <BackButton className="text-white font-bold text-base flex items-center gap-0.5">
              <LeftArrow />
              {title}
            </BackButton>
          </When>
        </Choose>
      </Column>

      <Column>
        <If condition={centerLogo}>
          <LogoLink />
        </If>
      </Column>

      <Column>
        <If condition={search}>
          <SearchButton />
        </If>
      </Column>
    </nav>
  );
}
