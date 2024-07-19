import createStepContext from '@contexts/step-context';

export const phoneSteps = [
  '휴대폰 번호를 입력하세요',
  '인증번호를 입력하세요',
] as const;
export const findIdSteps = [
  '성함을 입력하세요',
  ...phoneSteps,
  '회원님의 아이디를 찾았어요',
] as const;

export type FindIdSteps = (typeof findIdSteps)[number];

export const FindIdContext = createStepContext(findIdSteps);
