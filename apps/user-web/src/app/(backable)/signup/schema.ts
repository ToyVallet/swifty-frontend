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
const birth = z.date().refine((date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    year >= 1900 &&
    year <= new Date().getFullYear() &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31
  );
});

/** 내국인 | 외국인 */
const nationality = z.enum(['NATIVE', 'FOREIGNER']);

/** 성별 */
const sex = z.enum(['MALE', 'FEMALE']);

/** 통신사 */
const carrier = z.enum(['SKT', 'KT', 'LGU', 'BUDGET']);

/** 전화번호 */
const phoneNumber = z.string().refine((value) => /^\d{11}$/.test(value));

/** 인증번호 */
const verificationCode = z.string().refine((value) => /^\d{6}$/.test(value));

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
  birth,
  nationality,
  sex,
  carrier,
  phoneNumber,
  verificationCode,
  id,
  password,
  passwordConfirm,
});

export type FormValues = z.infer<typeof formSchema>;
