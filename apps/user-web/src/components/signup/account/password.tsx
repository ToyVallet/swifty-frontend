import { FormField, Input } from '@swifty/ui';

export default function Password() {
  return (
    <FormField
      name="password"
      render={({ field }) => (
        <Input
          {...field}
          type="password"
          label="비밀번호"
          placeholder="영문, 특수문자 포함 8자 이상"
          autoComplete="new-password"
        />
      )}
    />
  );
}
