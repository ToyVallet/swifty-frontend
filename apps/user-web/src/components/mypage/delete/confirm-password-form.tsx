'use client';

import { DeleteUserContext } from '@app/(backable)/mypage/delete/context';
import { GlobalPortal } from '@app/global-portal';
import { FixedBottomCTA } from '@components/common';
import { FormErrorControl } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { API_USER } from '@lib/constants';
import { passwordSchema } from '@lib/schema/schema';
import { APIError, customFetch } from '@swifty/shared-lib';
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

  const onSubmit = async (data: Schema) => {
    try {
      await customFetch(API_USER.checkPassword, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(data),
      });
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
