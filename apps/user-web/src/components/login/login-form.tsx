'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@swifty/ui';
import { Input } from '@swifty/ui';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  userId: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="아이디" {...field} />
              </FormControl>
              <FormDescription>Enter your ID</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="full" disabled={form.formState.disabled}>
          로그인
        </Button>
      </form>
    </Form>
  );
}
