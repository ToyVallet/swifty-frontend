import { z } from 'zod';

/** 이름 */
const name = z
  .string()
  .min(2, '이름은 2글자 이상이어야 합니다.')
  .refine(
    (value) => /[가-힣a-zA-Z]+/g.test(value),
    '한글과 영어만 허용합니다.',
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

const findId = z.string();

export const findIdSchema = z.object({
  name,
  phoneNumber,
  smsCode,
  findId,
});

export type FindIdSchema = z.infer<typeof findIdSchema>;
