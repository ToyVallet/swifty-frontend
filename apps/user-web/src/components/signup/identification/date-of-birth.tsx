import FormErrorControl from '@components/signup/form-error-control';
import { FormField, Input } from '@swifty/ui';

export default function DateOfBirth() {
  return (
    <FormField
      name="dateOfBirth"
      render={({ field }) => (
        <FormErrorControl>
          <Input
            type="text"
            label="생년월일"
            placeholder="YYYYMMDD"
            {...field}
          />
        </FormErrorControl>
      )}
    />
  );
}
