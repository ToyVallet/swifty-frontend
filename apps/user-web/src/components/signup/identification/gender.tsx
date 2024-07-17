import { FormErrorControl } from '@components/signup';
import { FormField, Select, type SelectOptionType } from '@swifty/ui';

const genderOptions: SelectOptionType[] = [
  {
    label: '남성',
    value: 'MALE',
  },
  {
    label: '여성',
    value: 'FEMALE',
  },
];

export default function Gender() {
  return (
    <FormField
      name="gender"
      render={({ field }) => (
        <FormErrorControl>
          <Select
            options={genderOptions}
            onValueChange={field.onChange}
            defaultValue={field.value}
            label="성별"
            placeholder="성별 선택"
          />
        </FormErrorControl>
      )}
    />
  );
}
