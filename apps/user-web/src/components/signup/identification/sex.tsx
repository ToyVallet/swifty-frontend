import { FormErrorControl } from '@components/signup';
import { FormField, Select, SelectOption } from '@swifty/ui';

const genderOptions = [
  {
    label: '남성',
    value: 'MALE',
  },
  {
    label: '여성',
    value: 'FEMALE',
  },
];

export default function Sex() {
  return (
    <FormField
      name="sex"
      render={({ field }) => (
        <FormErrorControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            label="성별"
            placeholder="성별 선택"
          >
            {genderOptions.map((option) => (
              <SelectOption value={option.value}>{option.label}</SelectOption>
            ))}
          </Select>
        </FormErrorControl>
      )}
    />
  );
}
