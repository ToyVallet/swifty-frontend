import createStepContext from '@app/context/step-context';

export const certificationsSteps = [
  '학적 인증을 시작할게요',
  '인증 이미지를 업로드 해주세요',
  '학적 인증 신청이 완료되었습니다.',
] as const;

export type CertificationStep = (typeof certificationsSteps)[number];

export const CertificationStepContext = createStepContext(certificationsSteps);
