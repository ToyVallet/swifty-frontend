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
        className={cn('grid gap-2', className)}
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
    <FormItem className="flex w-full">
      <FormControl>
        <RadioGroupItem value={value} ref={ref}>
          <FormLabel className="font-bold text-16">{label}</FormLabel>
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
        'relative data-[state=unchecked]:border data-[state=checked]:bg-primary overflow-hidden rounded-xl h-[50px] w-full px-5 text-white ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 ease-in-out',
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
