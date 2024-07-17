import { FormErrorControl } from '@components/signup';
import { FormField, Input } from '@swifty/ui';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<typeof Input>;
export default function OcrInput({ name, ...props }: Props) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormErrorControl>
          <Input {...field} {...props} />
        </FormErrorControl>
      )}
    />
  );
}
