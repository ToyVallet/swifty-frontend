import { z } from 'zod';

/** 마켓팅 활용 동의 여부 */
const agreedToMarketing = z.boolean();

/** 이름 */
const name = z.string().min(2, '이름은 2글자 이상이어야 합니다.');

/**
 * 생년월일 YYYYMMDD
 * * 1900년 이후, 현재 년도 이전
 * * 1월 이후, 12월 이전
 * * 1일 이후, 31일 이전
 */
const dateOfBirth = z
  .string()
  .regex(/^\d{8}$/, 'Invalid date format, must be YYYYMMDD')
  .refine((date) => {
    const year = parseInt(date.slice(0, 4), 10);
    const month = parseInt(date.slice(4, 6), 10);
    const day = parseInt(date.slice(6, 8), 10);
    const dateObject = new Date(year, month - 1, day);
    return (
      dateObject.getFullYear() === year &&
      dateObject.getMonth() + 1 === month &&
      dateObject.getDate() === day
    );
  }, 'Invalid date');

/** 내국인 | 외국인 */
const nationality = z.enum(['NATIVE', 'FOREIGNER']);

/** 성별 */
const sex = z.enum(['MALE', 'FEMALE']);

/** 통신사 */
const carrier = z.enum(['SKT', 'KT', 'LGU', 'MVNO']);

/** 전화번호 */
const phoneNumber = z
  .string()
  .refine((value) => /^\d{3}-\d{4}-\d{4}$/.test(value));

/** 인증번호 */
const SmsCode = z.string().refine((value) => /^\d{6}$/.test(value));

/** 아이디 */
const id = z.string().min(4, '아이디는 4글자 이상이어야 합니다.');

/** 비밀번호 */
const password = z.string().min(8, '비밀번호는 8글자 이상이어야 합니다.');

/** 비밀번호 확인 */
const passwordConfirm = z
  .string()
  .min(8, '비밀번호는 8글자 이상이어야 합니다.');

export const formSchema = z.object({
  agreedToMarketing,
  name,
  dateOfBirth,
  nationality,
  sex,
  carrier,
  phoneNumber,
  SmsCode,
  id,
  password,
  passwordConfirm,
});

export type FormValues = z.infer<typeof formSchema>;
