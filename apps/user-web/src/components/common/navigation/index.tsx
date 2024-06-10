import { BackButton } from '@components/common';
import { cn } from '@swifty/shared-lib';
import { Choose, Otherwise, When } from '@swifty/ui';
import { cva } from 'class-variance-authority';
import { IoArrowBackOutline } from 'react-icons/io5';

import Column from './column';
import LogoLink from './logo-link';

type NavigationProps = {
  variant?: 'root' | 'back' | 'back-with-logo';
  bg?: 'transparent' | 'gradient' | 'solid';
  search?: boolean;
  title?: string;
};

const navigationVariants = cva(
  'z-30 grid grid-cols-3 w-full px-5 h-[50px] py-5 fixed top-0',
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
              <IoArrowBackOutline size={25} className="text-white" />
              {title}
            </BackButton>
          </When>
        </Choose>
      </Column>

      <Column></Column>

      <Column></Column>

      {/* {(variant === 'back' || variant === 'back-with-logo') && (
        <BackButton className="text-white font-bold text-base flex items-center gap-0.5">
          <IoArrowBackOutline size={25} className="text-white" />
          {title}
        </BackButton>
      )} */}
    </nav>
  );
}
