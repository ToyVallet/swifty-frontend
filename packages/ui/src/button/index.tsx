'use client';

import { Slot } from '@radix-ui/react-slot';
import { cn } from '@swifty/shared-lib';
import { type VariantProps, cva } from 'class-variance-authority';
import { type MotionProps, motion } from 'framer-motion';
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import { Choose, Otherwise, When } from '../lib';

const buttonVariants = cva(
  'ui-flex ui-items-center ui-justify-center ui-gap-2.5 ui-whitespace-nowrap ui-rounded-xl ui-font-bold ui-ring-offset-background focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-ring focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 ui-transition-all ui-duration-200 ui-ease-in-out ui-user-select-none',
  {
    variants: {
      variant: {
        default: 'ui-bg-transparent',
        primary: 'ui-bg-primary hover:ui-bg-primary/90 ui-text-white',
        destructive: 'ui-bg-destructive hover:ui-bg-destructive/90',
        outlined:
          'ui-bg-transparent ui-border ui-border-black dark:ui-border-white',
        white: 'ui-bg-black ui-text-white dark:ui-bg-white dark:ui-text-black',
        ghost: 'hover:ui-bg-accent hover:ui-text-accent-foreground',
      },
      block: {
        true: 'ui-w-full ui-min-h-[50px] ui-px-4 ui-py-[13px]',
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
            'ui-pointer-events-none ui-opacity-50',
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
