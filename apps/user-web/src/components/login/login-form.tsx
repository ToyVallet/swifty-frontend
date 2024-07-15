'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { API_ROUTES } from '@lib/constants';
import { APIError } from '@swifty/shared-lib';
import { customFetch } from '@swifty/shared-lib';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@swifty/ui';
import { Input } from '@swifty/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  loginId: z.string().min(2, {
    message: '아이디는 최소 2자 이상이어야 합니다.',
  }),
  password: z.string().min(8, {
    message: '비밀번호는 최소 8자 이상이어야 합니다.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginId: '',
      password: '',
    },
  });

  const onSubmit = async ({ loginId, password }: FormValues) => {
    try {
      await customFetch(API_ROUTES.user.login, {
        method: 'POST',
        body: JSON.stringify({ loginId, password }),
      });
      router.push('/');
    } catch (e) {
      if (APIError.isAPIError(e)) {
        form.setError('root', {
          type: String(e.statusCode),
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="loginId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ID" label="아이디" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="********"
                  label="비밀번호"
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="root"
          render={({ field }) => <FormMessage {...field} />}
        />
        <div className="w-full flex justify-between text-14">
          <Link href="/forget-id" className="text-white">
            아이디를 잊으셨나요?
          </Link>
          <Link href="/forgot-password" className="text-white">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <Button type="submit" size="full" disabled={!form.formState.isValid}>
          로그인
        </Button>
        <Button size="full" variant="white" asChild>
          <Link href="/signup" className="text-black">
            회원가입
          </Link>
        </Button>
      </form>
    </Form>
  );
}
