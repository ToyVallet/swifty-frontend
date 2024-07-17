import { FormErrorControl } from '@components/signup';
import { FormField, Input } from '@swifty/ui';

export default function Id() {
  return (
    <FormField
      name="id"
      render={({ field }) => (
        <FormErrorControl>
          <Input
            {...field}
            label="아이디"
            placeholder="swifty1234"
            autoComplete="off"
          />
        </FormErrorControl>
      )}
    />
  );
}
