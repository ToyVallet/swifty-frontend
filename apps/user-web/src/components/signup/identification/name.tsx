import { FormErrorControl } from '@components/signup';
import { FormField, Input } from '@swifty/ui';

export default function Name() {
  return (
    <FormField
      name="name"
      render={({ field, fieldState }) => (
        <FormErrorControl>
          <Input
            {...field}
            label="이름"
            placeholder="홍길동"
            isError={fieldState.error}
          />
        </FormErrorControl>
      )}
    />
  );
}
