import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpg', 'image/jpeg'];

/**대학생 고유 아이디 */
const universityId = z.string();

/**학적 상태 */
const studentStatus = z.enum([
  'STUDENT',
  'GRADUATE',
  'DROP_OUT',
  'POST_GRADUATE',
]);

/**ocr 표기 이름 */
const ocrName = z.string();

/**ocr 학생 번호 */
const ocrStudentId = z.string();

/**ocr 학과 */
const ocrMajor = z.string();

/**ocr 학적 */
const ocrStudenStatus = z.string();

/**이미지 */
const image = z
  .instanceof(File)
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, '최대 5MB입니다.')
  .refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, '이미지 파일만 허용합니다. (jpg)');

export const univFormSchema = z.object({
  universityId,
  studentStatus,
  ocrName,
  ocrStudentId,
  ocrMajor,
  ocrStudenStatus,
  image,
});

export type UnivFormValues = z.infer<typeof univFormSchema>;
