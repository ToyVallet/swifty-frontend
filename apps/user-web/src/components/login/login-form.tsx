'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  userId: z.string().min(2, {
    message: '아이디는 최소 2자 이상이어야 합니다.',
  }),
  password: z.string().min(8, {
    message: '비밀번호는 최소 8자 이상이어야 합니다.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="아이디" autoComplete="off" {...field} />
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
                  placeholder="비밀번호"
                  type="password"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-between text-sm">
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
