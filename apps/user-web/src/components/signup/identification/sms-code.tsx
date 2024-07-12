import { FormErrorControl } from '@components/signup';
import { useInterval } from '@hooks/index';
import { Button, FormField, Input } from '@swifty/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const COUNT = 180;

export default function SmsCode() {
  const form = useFormContext();
  const [count, setCount] = useState(COUNT);

  useInterval(
    () => {
      if (count > 0) setCount(count - 1);
    },
    count > 0 ? 1000 : null,
  );

  const minute = Math.floor(count / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (count % 60).toString().padStart(2, '0');

  const onRequest = async () => {
    const phoneNumber = form.getValues('phoneNumber');
    // 재 요청 보내기
    // 재 요청 후 타이머 실행
    setCount(COUNT);
  };
  return (
    <div className="flex flex-col gap-3">
      <FormField
        name="smsCode"
        render={({ field }) => (
          <FormErrorControl>
            <Input
              {...field}
              type="number"
              label="인증번호"
              placeholder="숫자 6자리"
              maxLength={6}
            />
          </FormErrorControl>
        )}
      />
      <Button size="full" onClick={onRequest} disabled={count > 0}>
        {count > 0 ? `${minute}:${seconds}` : '인증번호 재요청'}
      </Button>
    </div>
  );
}
