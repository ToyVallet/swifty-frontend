import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/JPEG',
  'image/JPG',
  'image/PNG',
];

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
  .any()
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
    '.jpg, .jpeg, .png, .webp 형식 이미지 파일만 허용합니다.',
  );

const exampleImage = z.string();

export const univFormSchema = z.object({
  universityId,
  studentStatus,
  ocrName,
  ocrStudentId,
  ocrMajor,
  ocrStudenStatus,
  image,
  exampleImage,
});

export type UnivFormValues = z.infer<typeof univFormSchema>;
