import { z } from 'zod';

const phoneNumber = z
  .string()
  .refine(
    (value) => /^\d{3}-\d{4}-\d{4}$/.test(value),
    '010-1234-5678 형식입니다.',
  );

const smsCode = z
  .string()
  .refine((value) => /^\d{6}$/.test(value), '6자리 숫자입니다.');

const currentPassword = z
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

const newPassword = currentPassword;

const confirmNewPassword = z.string();

export const findPasswordSchema = z
  .object({
    phoneNumber,
    smsCode,
    currentPassword,
    newPassword,
    confirmNewPassword,
  })
  .partial()
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type FindPasswordSchema = z.infer<typeof findPasswordSchema>;
