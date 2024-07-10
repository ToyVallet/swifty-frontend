import { z } from 'zod';

/**제 3자와 정보 제공 동의  여부*/
const privacyInfoAvaliable = z.boolean();

/** 마켓팅 활용 동의 여부 */
const marketingAvailable = z.boolean();

/** 이름 */
const name = z
  .string()
  .min(2, '이름은 2글자 이상이어야 합니다.')
  .refine(
    (value) => /[가-힣a-zA-Z]+/g.test(value),
    '한글과 영어만 허용합니다.',
  );

/**
 * 생년월일 YYYYMMDD
 * * 1900년 이후, 현재 년도 이전
 * * 1월 이후, 12월 이전
 * * 1일 이후, 31일 이전
 */
const dateOfBirth = z
  .string()
  .regex(/^\d{8}$/, '날짜 형식이 맞지 않습니다. YYYYMMDD')
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
  .refine(
    (value) => /^\d{3}-\d{4}-\d{4}$/.test(value),
    '010-1234-5678 형식입니다.',
  );

/** 인증번호 */
const smsCode = z
  .string()
  .refine((value) => /^\d{6}$/.test(value), '6자리 숫자입니다.');

/** 아이디 */
const id = z
  .string()
  .min(6, '6글자 이상이어야 합니다.')
  .max(32, '32글자 이하여야 합니다.')
  .refine(
    (value) => /^[A-Za-z\d]{6,32}$/.test(value),
    '영어와 숫자만 입력가능합니다.',
  );

/** 비밀번호 */

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

export const formSchema = z
  .object({
    privacyInfoAvaliable,
    marketingAvailable,
    name,
    dateOfBirth,
    nationality,
    sex,
    carrier,
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
export type FormValues = z.infer<typeof formSchema>;
