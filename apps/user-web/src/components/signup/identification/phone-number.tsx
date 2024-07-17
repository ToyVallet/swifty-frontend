import { FormErrorControl } from '@components/signup';
import { FormField, Input } from '@swifty/ui';

export default function PhoneNumber() {
  return (
    <FormField
      name="phoneNumber"
      render={({ field }) => (
        <FormErrorControl>
          <Input
            type="tel"
            label="전화번호"
            placeholder="010-1234-5678"
            {...field}
          />
        </FormErrorControl>
      )}
    />
  );
}
