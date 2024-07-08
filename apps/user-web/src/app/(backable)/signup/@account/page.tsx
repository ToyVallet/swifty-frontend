'use client';

import type { FormValues } from '@app/(backable)/signup/schema';
import IdCheckInput from '@components/signup/id-check-input';
import { FormControl, FormField, FormItem, FormMessage } from '@swifty/ui';
import { useFormContext } from 'react-hook-form';

export default function AccountPage() {
  const form = useFormContext<FormValues>();
  return (
    <FormField
      control={form.control}
      name="id"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <IdCheckInput {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
