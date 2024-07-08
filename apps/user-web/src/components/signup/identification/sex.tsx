import { FormControl, FormField, Select } from '@swifty/ui';

export default function Sex() {
  return (
    <FormField
      name="sex"
      render={({ field }) => (
        <FormControl>
          <Select
            onValueChange={field.onChange}
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
        </FormControl>
      )}
    />
  );
}
