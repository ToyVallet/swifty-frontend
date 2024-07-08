import { FormField, Input } from '@swifty/ui';

export default function Password() {
  return (
    <>
      <FormField
        name="passwordConfirm"
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요"
            autoComplete="new-password"
          />
        )}
      />
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
    </>
  );
}
