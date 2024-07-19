import { z } from 'zod';

export const authInfoSchema = z.object({
  studentId: z.string().length(8, '학번은 8자리로 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자리 이상입니다.'),
});

export const passwordSchema = z
  .string()
  .min(8, '8자 이상이어야 합니다.')
  .max(32, '32자 이내여야 합니다.')
  .refine((value) => /[~!@#$%^&*_+\-=|{}<>?,./]/.test(value), {
    message: '최소 1개의 특수문자를 포함해야 합니다. (~!@#$%^&*_+-=|{}<>?,./)',
  })
  .refine((value) => /[a-z]/.test(value), {
    message: '최소 1개의 소문자를 포함해야 합니다. (a-z)',
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: '최소 1개의 대문자를 포함해야 합니다. (A-Z)',
  })
  .refine((value) => /\d/.test(value), {
    message: '최소 1개의 숫자를 포함해야 합니다. (0-9)',
  });

export type AuthInfoSchema = z.infer<typeof authInfoSchema>;
