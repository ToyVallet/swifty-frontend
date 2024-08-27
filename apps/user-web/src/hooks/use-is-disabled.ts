'use client';

import { useFormContext, useWatch } from 'react-hook-form';

export default function useIsDisabled(field: string) {
  const form = useFormContext();

  useWatch({
    control: form.control,
    name: field,
  });

  const { invalid, isDirty } = form.getFieldState(field, form.formState);
  const isDisabled = invalid || !isDirty;
  return isDisabled;
}
