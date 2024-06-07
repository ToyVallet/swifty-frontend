'use client';

import { Slot } from '@radix-ui/react-slot';
import { cn } from '@swifty/shared-lib';
import { type VariantProps, cva } from 'class-variance-authority';
import { type MotionProps, motion } from 'framer-motion';
import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import { transition } from '../lib';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[12px] h-[50px] font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors duration-200 ease-in-out user-select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        white: 'bg-white hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'px-4 py-[13px]',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & MotionProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, ...props },
    ref,
  ) => {
    if (isLoading) {
      return (
        <button
          className={cn(
            'relative',
            buttonVariants({ variant, size, className }),
          )}
          disabled
          ref={ref}
          {...props}
        >
          <PulseLoader role="status" size={8} color="#f0f0f0" />
        </button>
      );
    }

    const Comp = asChild ? Slot : 'button';
    const C = motion(Comp);
    return (
      <C
        whileTap={{ scale: 0.98 }}
        transition={transition}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;
export { buttonVariants };
