'use client';

import { DeleteUserContext } from '@app/(backable)/mypage/delete/context';
import { GlobalPortal } from '@app/global-portal';
import { FixedBottomCTA } from '@components/common';
import { FormErrorControl } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '@lib/schema/schema';
import { APIError, http } from '@swifty/shared-lib';
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

  const onSubmit = async (body: Schema) => {
    try {
      await http.post('/user/check/pwd', body, { credentials: 'include' });
      nextStep();
    } catch (e) {
      if (APIError.isAPIError(e)) {
        form.setError('password', {
          type: String(e.statusCode),
          message: e.message[0],
        });
      }
    }
  };
  return (
    <div className="w-full mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="password"
            render={({ field, fieldState }) => (
              <FormErrorControl>
                <Input
                  label="비밀번호"
                  placeholder="********"
                  type="password"
                  isError={fieldState.error}
                  {...field}
                />
              </FormErrorControl>
            )}
          />
          <GlobalPortal.Provider>
            <FixedBottomCTA type="submit" disabled={!isValid}>
              확인
            </FixedBottomCTA>
          </GlobalPortal.Provider>
        </form>
      </Form>
    </div>
  );
}
