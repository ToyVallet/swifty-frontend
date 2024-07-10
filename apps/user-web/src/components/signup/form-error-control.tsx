'use client';

import type { PropsWithClassName } from '@swifty/shared-lib';
import { FormControl, FormItem, FormMessage } from '@swifty/ui';

export default function FormErrorControl({
  children,
  className,
}: PropsWithClassName) {
  return (
    <FormItem className={className}>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
}
