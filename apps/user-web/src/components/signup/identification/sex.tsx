import { FormErrorControl } from '@components/signup';
import { FormField, Select } from '@swifty/ui';

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
            options={[
              {
                label: '남성',
                value: 'MALE',
              },
              {
                label: '여성',
                value: 'FEMALE',
              },
            ]}
          />
        </FormErrorControl>
      )}
    />
  );
}
