'use client';

import { cn } from '@swifty/shared-lib';
import { default as NextLink } from 'next/link';
import type { ComponentProps, PropsWithChildren } from 'react';

import Button, { type ButtonProps } from './button';

type LinkProps = PropsWithChildren<{
  disabled?: boolean;
  variant?: 'text' | ButtonProps['variant'];
  className?: string;
  href: string | { pathname: string; query: Record<string, string> };
}> &
  Omit<ComponentProps<typeof NextLink>, 'href'>;

export default function Link({
  children,
  href,
  className,
  disabled = false,
  variant = 'text',
  ...props
}: LinkProps) {
  return variant === 'text' ? (
    <NextLink
      href={href}
      className={cn(
        'w-full h-full flex justify-center items-center',
        className,
      )}
    >
      {children}
    </NextLink>
  ) : (
    <Button variant={variant} disabled={disabled} className={className}>
      <NextLink
        href={href}
        className="w-full h-full flex justify-center items-center"
        scroll={props.scroll}
      >
        {children}
      </NextLink>
    </Button>
  );
}
