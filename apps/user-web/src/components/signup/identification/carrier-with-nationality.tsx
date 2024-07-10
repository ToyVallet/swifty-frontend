import type { FormValues } from '@app/(backable)/signup/schema';
import { FormErrorControl } from '@components/signup';
import { FormField, RadioGroup, RadioOption, Select } from '@swifty/ui';
import { useFormContext } from 'react-hook-form';

export default function CarrierWithNationality() {
  const { control } = useFormContext<FormValues>();

  return (
    <div className="flex flex-col gap-5">
      <FormField
        control={control}
        name="carrier"
        render={({ field }) => (
          <FormErrorControl>
            <Select
              label="통신사"
              placeholder="통신사 선택"
              onValueChange={field.onChange}
              defaultValue={field.value}
              options={[
                { label: 'SKT', value: 'SKT' },
                { label: 'KT', value: 'KT' },
                { label: 'LG U+', value: 'LG U+' },
                { label: '알뜰폰', value: 'MVNO' },
              ]}
            />
          </FormErrorControl>
        )}
      />
      <FormField
        control={control}
        defaultValue="NATIVE"
        name="nationality"
        render={({ field }) => (
          <FormErrorControl className="space-y-3">
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex w-full gap-5 items-center justify-between"
            >
              <RadioOption value="NATIVE" label="내국인" />
              <RadioOption value="FOREIGNER" label="외국인" />
            </RadioGroup>
          </FormErrorControl>
        )}
      />
    </div>
  );
}
