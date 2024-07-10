import FormErrorControl from '@components/signup/form-error-control';
import { FormField, Input } from '@swifty/ui';

export default function DateOfBirth() {
  return (
    <FormField
      name="dateOfBirth"
      render={({ field }) => (
        <FormErrorControl>
          <Input
            type="number"
            label="생년월일"
            placeholder="YYYYMMDD"
            maxLength={8}
            {...field}
          />
        </FormErrorControl>
      )}
    />
  );
}
