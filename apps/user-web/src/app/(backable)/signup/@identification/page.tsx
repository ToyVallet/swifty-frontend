'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
} from '@swifty/ui';
import { useFormContext } from 'react-hook-form';

import { type FormValues } from '../schema';

export default function Identification() {
  const form = useFormContext<FormValues>();

  return (
    <FormField
      control={form.control}
      defaultValue="NATIVE"
      name="nationality"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex w-full gap-5 items-center justify-between"
            >
              <FormItem className="flex w-full">
                <FormControl>
                  <RadioGroupItem value="NATIVE">
                    <FormLabel className="font-bold text-16 z-10">
                      내국인
                    </FormLabel>
                  </RadioGroupItem>
                </FormControl>
              </FormItem>

              <FormItem className="flex w-full">
                <FormControl>
                  <RadioGroupItem value="FOREIGNER">
                    <FormLabel className="font-bold text-16 z-10">
                      외국인
                    </FormLabel>
                  </RadioGroupItem>
                </FormControl>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    ></FormField>
  );
}
