'use client';

import { DeleteUserContext } from '@app/(backable)/mypage/delete/context';
import { FixedBottomCTA } from '@components/common';
import { FormErrorControl } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '@lib/schema/schema';
import { Form, FormField, Input } from '@swifty/ui';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  password: passwordSchema,
});

type Schema = z.infer<typeof schema>;

export default function ConfirmPasswordForm() {
  const { nextStep } = useContext(DeleteUserContext);

  const form = useForm<Schema>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const {
    formState: { isValid },
  } = form;

  const onSubmit = (data: Schema) => {
    console.log('hello');
    console.log(data);
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="password"
            render={({ field }) => (
              <FormErrorControl>
                <Input
                  label="비밀번호"
                  placeholder="********"
                  type="password"
                  {...field}
                />
              </FormErrorControl>
            )}
          />
          <FixedBottomCTA type="submit" disabled={!isValid}>
            확인
          </FixedBottomCTA>
        </form>
      </Form>
    </div>
  );
}
