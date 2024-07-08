import { FormField, FormItem, Input } from '@swifty/ui';

export default function PhoneNumber() {
  return (
    <FormField
      name="phoneNumber"
      render={({ field }) => (
        <FormItem>
          <Input
            type="tel"
            label="전화번호"
            placeholder="010-1234-5678"
            {...field}
          />
        </FormItem>
      )}
    />
  );
}
