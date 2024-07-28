import FormErrorControl from '@components/signup/form-error-control';
import { FormField, Input } from '@swifty/ui';

export default function DateOfBirth() {
  return (
    <FormField
      name="dateOfBirth"
      render={({ field, fieldState }) => (
        <FormErrorControl>
          <Input
            type="text"
            label="생년월일"
            placeholder="YYYYMMDD"
            isError={fieldState.error}
            {...field}
          />
        </FormErrorControl>
      )}
    />
  );
}
