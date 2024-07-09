import { FormField, Input } from '@swifty/ui';

export default function SmsCode() {
  return (
    <FormField
      name="smsCode"
      render={({ field }) => (
        <Input
          {...field}
          type="number"
          label="인증번호"
          placeholder="숫자 6자리"
          maxLength={6}
        />
      )}
    />
  );
}
