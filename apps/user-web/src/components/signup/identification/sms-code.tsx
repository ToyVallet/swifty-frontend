'use client';

import { FormErrorControl } from '@components/signup';
import { useInterval } from '@hooks/index';
import { APIError, type SmsSituationCode } from '@swifty/shared-lib';
import { Button, FormField, Input } from '@swifty/ui';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { sendSms } from 'src/api';

const COUNT = 180;

type Props = {
  situationCode: SmsSituationCode;
};

export default function SmsCode({ situationCode }: Props) {
  const form = useFormContext();
  const [count, setCount] = useState(COUNT);
  const phone = useRef<string>(form.getValues('phoneNumber'));
  const phoneNumber = form.getValues('phoneNumber');

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
    // 재 요청 보내기
    try {
      await sendSms(phoneNumber, situationCode);
    } catch (e) {
      if (APIError.isAPIError(e)) {
        form.setError('smsCode', {
          type: String(e.statusCode),
          message: e.message[0],
        });
      }
      return;
    }
    // 재 요청 후 타이머 실행
    setCount(COUNT);
  };

  useEffect(() => {
    if (phone.current !== phoneNumber) {
      setCount(0);
      phone.current = phoneNumber;
    }
  }, [phoneNumber]);

  return (
    <div className="flex flex-col gap-3">
      <FormField
        name="smsCode"
        render={({ field, fieldState }) => (
          <FormErrorControl>
            <Input
              {...field}
              type="number"
              label="인증번호"
              placeholder="숫자 6자리"
              maxLength={6}
              isError={fieldState.error}
            />
          </FormErrorControl>
        )}
      />
      <Button block variant="primary" onClick={onRequest} disabled={count > 0}>
        {count > 0 ? `${minute}:${seconds}` : '인증번호 재요청'}
      </Button>
    </div>
  );
}
