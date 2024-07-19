import { z } from 'zod';

const id = z
  .string()
  .min(6, '6글자 이상이어야 합니다.')
  .max(32, '32글자 이하여야 합니다.')
  .refine(
    (value) => /^[A-Za-z\d]{6,32}$/.test(value),
    '영어와 숫자만 입력가능합니다.',
  );

/** 전화번호 */
const phoneNumber = z
  .string()
  .refine(
    (value) => /^\d{3}-\d{4}-\d{4}$/.test(value),
    '010-1234-5678 형식입니다.',
  );

/** 인증번호 */
const smsCode = z
  .string()
  .refine((value) => /^\d{6}$/.test(value), '6자리 숫자입니다.');

const password = z
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

/** 비밀번호 확인 */
const passwordConfirm = z.string();

export const findPasswordSchema = z
  .object({
    phoneNumber,
    smsCode,
    id,
    password,
    passwordConfirm,
  })
  .partial()
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });
export type FindPasswordSchema = z.infer<typeof findPasswordSchema>;
