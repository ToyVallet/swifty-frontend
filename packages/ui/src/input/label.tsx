'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@swifty/shared-lib';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const labelVariants = cva(
  'peer-disabled:ui-cursor-not-allowed peer-disabled:ui-opacity-70',
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
