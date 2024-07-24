'use client';

import { Slot } from '@radix-ui/react-slot';
import { cn } from '@swifty/shared-lib';
import { type VariantProps, cva } from 'class-variance-authority';
import { type MotionProps, motion } from 'framer-motion';
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import { Choose, Otherwise, When } from '../lib';

const buttonVariants = cva(
  'flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 ease-in-out user-select-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-white',
        primary: 'bg-primary text-white hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outlined:
          'bg-transparent border brder-dark text-black dark:border-white dark:text-white',
        white: 'bg-white text-black',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      block: {
        true: 'w-full min-h-[50px] px-4 py-[13px]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      block: false,
    },
  },
);

export type ButtonProps = {
  asChild?: boolean;
  isLoading?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps & MotionProps>(
  (
    {
      block,
      className,
      variant,
      asChild = false,
      isLoading = false,
      prefix,
      suffix,
      ...props
    },
    ref,
  ) => {
    if (isLoading) {
      return (
        <button
          className={cn(
            buttonVariants({ variant, block, className }),
            'pointer-events-none opacity-50',
          )}
          disabled
          ref={ref}
          {...props}
        >
          <PulseLoader
            role="status"
            size={8}
            color={variant === 'white' ? '#A2A2A7' : '#f0f0f0'}
          />
        </button>
      );
    }
    const Prefix = prefix ? () => <>{prefix}</> : () => null;
    const Suffix = suffix ? () => <>{suffix}</> : () => null;
    // const Comp = asChild ? Slot : 'button';
    return (
      <Choose value={asChild}>
        <When value={true}>
          <Slot
            className={cn(buttonVariants({ variant, block, className }))}
            ref={ref}
            {...props}
          />
        </When>
        <Otherwise>
          <motion.button
            whileTap={{
              scale: 0.98,
              backgroundColor:
                variant === 'outlined' ? 'rgba(255, 255, 255, 1)' : '',
              color: variant === 'outlined' ? 'rgba(0, 0, 0, 1)' : '',
            }}
            transition={{
              duration: 0.1,
              ease: 'easeInOut',
            }}
            className={cn(buttonVariants({ variant, block, className }))}
            ref={ref}
            {...props}
          >
            <Prefix />
            {props.children}
            <Suffix />
          </motion.button>
        </Otherwise>
      </Choose>
    );
  },
);

Button.displayName = 'Button';

export default Button;
export { buttonVariants };
