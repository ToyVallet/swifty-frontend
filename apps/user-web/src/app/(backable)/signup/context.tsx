import createStepContext from '@contexts/step-context';

export const termsSteps = ['약관 동의가 필요해요'] as const;

export const identificationSteps = [
  '성함을 알려주세요',
  '생년월일을 알려주세요',
  '성별을 알려주세요',
  '통신사를 선택해주세요',
  '휴대폰 번호를 알려주세요',
  '휴대폰 번호를 인증할게요',
] as const;

export const accountSteps = [
  '사용하실 아이디를 입력해주세요',
  '사용하실 비밀번호를 입력해주세요',
  '비밀번호를 한번 더 입력해주세요',
] as const;

export const steps = [
  ...termsSteps,
  ...identificationSteps,
  ...accountSteps,
  '회원가입이 완료되었어요',
] as const;

export type Step = (typeof steps)[number];
export const stepsWithForm: { [index in Step]: string } = {
  '약관 동의가 필요해요': 'isMarketingAvailable',
  '성함을 알려주세요': 'name',
  '생년월일을 알려주세요': 'dateOfBirth',
  '성별을 알려주세요': 'gender',
  '통신사를 선택해주세요': 'carrier',
  '휴대폰 번호를 알려주세요': 'phoneNumber',
  '휴대폰 번호를 인증할게요': 'smsCode',
  '사용하실 아이디를 입력해주세요': 'id',
  '사용하실 비밀번호를 입력해주세요': 'password',
  '비밀번호를 한번 더 입력해주세요': 'passwordConfirm',
  '회원가입이 완료되었어요': '',
};

export const SignUpStepContext = createStepContext(steps);
