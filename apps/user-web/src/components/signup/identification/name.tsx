import { FormField, Input } from '@swifty/ui';

export default function Name() {
  return (
    <FormField
      name="name"
      render={({ field }) => (
        <Input {...field} label="이름" placeholder="홍길동" />
      )}
    />
  );
}
