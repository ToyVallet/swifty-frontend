'use client';

import { Icon } from '@swifty/assets';
import { Button } from '@swifty/ui';
import { useRouter } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';

type BackButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  link?: string;
};

export default function Navigation({ onClick, ...props }: BackButtonProps) {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      router.back();
    }
  };
  return (
    <nav className="fixed w-full h-[40px] top-0 left-0 px-2.5">
      <Button onClick={handleClick} {...props}>
        <Icon name="using-ticket/back" width={43} height={40} />
      </Button>
    </nav>
  );
}
