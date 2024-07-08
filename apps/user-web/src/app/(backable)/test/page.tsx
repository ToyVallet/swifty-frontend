'use client';

import { Select } from '@components/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@swifty/ui';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  sex: z.enum(['남성', '여성'] as const),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const data = ['남성', '여성'] as const;
  const form = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => {
            const onChange = field.onChange;
            return (
              <Select
                defaultValue="성별 선택"
                label="성별"
                data={data}
                name="sexSelect"
                onChange={onChange}
              />
            );
          }}
        />
        <button className="bg-white">Submit</button>
      </form>
    </Form>
  );
}
