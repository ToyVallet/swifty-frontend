'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { APIError, http } from '@swifty/shared-lib';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@swifty/ui';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import FixedBottomGroup from '../fixed-bottom-group';

type Props = {
  onSucess?: () => void;
  captchaKey: string;
};

const formSchema = z.object({
  key: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function GoogleCaptcha({ onSucess, captchaKey }: Props) {
  const [image, setImage] = useState<null | string>(null);

  const form = useForm<FormValues>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: '',
    },
  });

  useWatch({
    control: form.control,
    name: 'key',
  });

  const { invalid, isDirty } = form.getFieldState('key', form.formState);
  const isDisabled = invalid || !isDirty;

  const onSubmit = async ({ key }: FormValues) => {
    try {
      await http.post(
        '/captcha/verify',
        {
          captchaKey: captchaKey,
          captchaValue: key,
        },
        { credentials: 'include' },
      );
      onSucess?.();
    } catch (e) {
      if (APIError.isAPIError(e)) {
        toast.error(e.message[0]);
      }
    }
  };

  const onRefetch = async () => {
    const blob = await http.get<Blob>('/captcha/image/{key}', {
      params: { key: captchaKey },
      credentials: 'include',
    });
    if (blob instanceof Blob) {
      const objectURL = URL.createObjectURL(blob);
      setImage(objectURL);
    }
  };

  useEffect(() => {
    try {
      http
        .get<Blob>('/captcha/image/{key}', {
          params: { key: captchaKey },
          credentials: 'include',
        })
        .then((data) => {
          if (data instanceof Blob) {
            const objectURL = URL.createObjectURL(data);
            setImage(objectURL);
          }
        });
    } catch (err) {
      if (APIError.isAPIError(err)) toast.error(err.message[0]);
    }
  }, []);

  if (!image) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex flex-col items-center gap-2 w-[300px]">
      <Image
        src={image}
        width={300}
        height={300}
        alt="capthcha"
        className="object-contain"
      />

      <Form {...(form as any)}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <FormField
            control={form.control as any}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Captcha 값을 입력하세요"
                    label="Captcha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={onRefetch} type="button" block variant="white">
            이미지 새로고침
          </Button>
          <Button type="submit" block variant="primary" disabled={isDisabled}>
            인증
          </Button>
        </form>
      </Form>
    </div>
  );
}
