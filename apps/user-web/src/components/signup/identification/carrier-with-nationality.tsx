import type { FormValues } from '@app/(backable)/signup/schema';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
  Select,
} from '@swifty/ui';
import { useFormContext } from 'react-hook-form';

export default function CarrierWithNationality() {
  const { control } = useFormContext<FormValues>();

  return (
    <section className="flex flex-col gap-5">
      <FormField
        control={control}
        name="carrier"
        render={({ field }) => (
          <FormItem>
            <Select
              label="통신사"
              placeholder="통신사 선택"
              onChange={field.onChange}
              options={[
                { label: 'SKT', value: 'SKT' },
                { label: 'KT', value: 'KT' },
                { label: 'LG U+', value: 'LG U+' },
                { label: '알뜰폰', value: 'MVNO' },
              ]}
            />
          </FormItem>
        )}
      />
      <FormField
        control={control}
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
      />
    </section>
  );
}
