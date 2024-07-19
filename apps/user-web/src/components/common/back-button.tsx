'use client';

import { Button } from '@swifty/ui';
import { useRouter } from 'next/navigation';
import { type ComponentPropsWithRef } from 'react';

type BackButtonProps = ComponentPropsWithRef<typeof Button>;

export default function BackButton({ onClick, ...props }: BackButtonProps) {
  const router = useRouter();
  return (
    <Button
      onClick={(e) => {
        router.back();
        onClick?.(e);
      }}
      {...props}
    />
  );
}
