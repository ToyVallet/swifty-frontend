'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@swifty/shared-lib';
import * as React from 'react';

import { FormControl, FormItem, FormLabel } from '../form';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <FormControl>
      <RadioGroupPrimitive.Root
        className={cn('ui-grid ui-gap-2', className)}
        {...props}
        ref={ref}
      />
    </FormControl>
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

type RadioOptionProps = {
  value: string;
  label: string;
} & React.ComponentPropsWithoutRef<typeof RadioGroupItem>;

const RadioOption = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  RadioOptionProps
>(({ value, label }, ref) => {
  return (
    <FormItem className="ui-flex ui-w-full">
      <FormControl>
        <RadioGroupItem value={value} ref={ref}>
          {label}
        </RadioGroupItem>
      </FormControl>
    </FormItem>
  );
});
RadioOption.displayName = 'RadioOption';

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'ui-relative data-[state=unchecked]:ui-border data-[state=unchecked]:ui-border-swifty-color-400 data-[state=unchecked]:ui-text-swifty-color-400 data-[state=checked]:ui-text-white  data-[state=checked]:ui-bg-primary ui-overflow-hidden ui-rounded-xl ui-h-[50px] ui-w-full ui-px-5 ui-ring-offset-background focus:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-ring focus-visible:ui-ring-offset-2 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 ui-transition-colors ui-duration-200 ui-ease-in-out',
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioOption };
