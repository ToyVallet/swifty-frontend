'use client';

import { cn } from '@swifty/shared-lib';
import { cva } from 'class-variance-authority';
import { MotionProps, motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import PulseLoader from 'react-spinners/PulseLoader';

import { variants } from './motion';

export type ButtonProps = MotionProps & {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  variant?: 'default' | 'outlined' | 'transparent' | 'bottom';
};

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-neutral-50',
        outlined: 'border border-primary',
        transparent:
          'text-neutral-500 dark:text-neutral-500 bg-white dark:bg-[#0C0C0C] dark:active:bg-[#1C1C1C]',
        bottom:
          'absolute bottom-5 mx-auto w-[calc(100%-2.5rem)] bg-primary text-neutral-50',
      },
      size: {
        default: 'h-[50px] px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-[50px] w-[50px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export default function Button({
  className,
  children,
  variant = 'default',
  type = 'button',
  onClick,
  isLoading = false,
  disabled,
}: ButtonProps) {
  const { formState } = useFormContext() ?? {};
  const motionProps = {
    variants: variants.button,
    initial: 'initial',
    whileTap: variant === 'outlined' ? 'lighterAndSmaller' : 'dimmedAndSmaller',
    whileHover: variant === 'outlined' ? 'lighter' : '',
  };

  const isDisabled =
    type === 'submit'
      ? formState?.isSubmitting || !formState?.isValid || disabled || isLoading
      : disabled || isLoading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(buttonVariants({ variant }), className)}
      initial={{
        scale: 1,
        background: '',
        filter: 'brightness(1)',
      }}
      whileTap={{
        scale: 0.99,
        background: variant === 'outlined' ? '#FEFEFE' : '',
        color: variant === 'outlined' ? '#000' : '',
        filter: 'brightness(0.9)',
      }}
      whileHover={{
        background: variant === 'outlined' ? '#FEFEFE' : '',
        color: variant === 'outlined' ? '#000' : '',
      }}
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 20,
        duration: 0.01,
      }}
    >
      {isLoading ? (
        <PulseLoader role="status" size={8} color="#f0f0f0" />
      ) : (
        children
      )}
    </motion.button>
  );
}
