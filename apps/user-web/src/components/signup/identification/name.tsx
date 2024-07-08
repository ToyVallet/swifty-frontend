import { FormField, Input } from '@swifty/ui';

export default function Name() {
  return (
    <FormField
      name="name"
      render={({ field }) => <Input {...field} placeholder="이름" />}
    />
  );
}
