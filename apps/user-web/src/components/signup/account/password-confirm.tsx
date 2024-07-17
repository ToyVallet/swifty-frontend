import { FormErrorControl } from '@components/signup';
import { FormField, Input } from '@swifty/ui';

export default function PasswordConfirm() {
  return (
    <FormField
      name="passwordConfirm"
      render={({ field }) => (
        <FormErrorControl>
          <Input
            {...field}
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요"
            autoComplete="new-password"
          />
        </FormErrorControl>
      )}
    />
  );
}
