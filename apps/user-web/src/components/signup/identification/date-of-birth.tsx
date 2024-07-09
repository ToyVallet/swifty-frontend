import { FormField, FormItem, Input } from '@swifty/ui';

export default function DateOfBirth() {
  return (
    <FormField
      name="dateOfBirth"
      render={({ field }) => (
        <FormItem>
          <Input
            type="number"
            label="생년월일"
            placeholder="YYYYMMDD"
            maxLength={8}
            {...field}
          />
        </FormItem>
      )}
    />
  );
}
