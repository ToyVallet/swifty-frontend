import { FormField, Input } from '@swifty/ui';

export default function Id() {
  return (
    <FormField
      name="id"
      render={({ field }) => (
        <Input
          {...field}
          label="아이디"
          placeholder="swifty1234"
          autoComplete="off"
        />
      )}
    />
  );
}
