'use client';

import { FormErrorControl } from '@components/signup';
import { FormField, Input } from '@swifty/ui';

type Props = {
  name: string;
  label: string;
};

export default function Password({ name, label }: Props) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormErrorControl>
          <Input
            type="password"
            label={label}
            placeholder="영문, 특수문자 포함 8자 이상"
            {...field}
          />
        </FormErrorControl>
      )}
    />
  );
}
