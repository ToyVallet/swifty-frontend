import createStepContext from '@contexts/step-context';

export const phoneSteps = [
  '휴대폰 번호를 입력하세요',
  '인증번호를 입력하세요',
] as const;
export const passwordSteps = [
  '새 비밀번호를 입력하세요',
  '비밀번호를 확인해주세요',
] as const;
export const findPasswordSteps = [
  '아이디를 입력하세요',
  ...phoneSteps,
  ...passwordSteps,
  '비밀번호가 재설정 되었습니다',
] as const;

export type FindPasswordSteps = (typeof findPasswordSteps)[number];

export const FindPasswordContext = createStepContext(findPasswordSteps);
