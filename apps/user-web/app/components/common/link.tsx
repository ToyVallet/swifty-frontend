'use client';

import { Link as IntlLink } from '@lib/navigation';
import { cn } from '@lib/utils';
import { ComponentProps, PropsWithChildren } from 'react';

import Button, { ButtonProps } from './button';

type LinkProps = PropsWithChildren<{
  disabled?: boolean;
  variant?: 'text' | ButtonProps['variant'];
  className?: string;
  href: string | { pathname: string; query: Record<string, string> };
}> &
  Omit<ComponentProps<typeof IntlLink>, 'href'>;

export default function Link({
  children,
  href,
  className,
  disabled = false,
  variant = 'text',
  ...props
}: LinkProps) {
  return variant === 'text' ? (
    <IntlLink
      href={href}
      className={cn(
        'w-full h-full flex justify-center items-center',
        className,
      )}
    >
      {children}
    </IntlLink>
  ) : (
    <Button variant={variant} disabled={disabled} className={className}>
      <IntlLink
        href={href}
        className="w-full h-full flex justify-center items-center"
        scroll={props.scroll}
      >
        {children}
      </IntlLink>
    </Button>
  );
}
