import createStepContext from '@contexts/step-context';

export const phoneSteps = [
  '휴대폰 번호를 입력하세요',
  '인증번호를 입력하세요',
] as const;

export const currentPasswordSteps = ['현재 비밀번호를 입력하세요'] as const;

export const newPasswordSteps = [
  '새 비밀번호를 입력하세요',
  '비밀번호를 확인해주세요',
] as const;

export const steps = [
  ...phoneSteps,
  ...currentPasswordSteps,
  ...newPasswordSteps,
  '비밀번호가 재설정 되었습니다.',
] as const;

export const stepsWithForm = {
  '휴대폰 번호를 입력하세요': 'phoneNumber',
  '인증번호를 입력하세요': 'smsCode',
  '현재 비밀번호를 입력하세요': 'currentPassword',
  '새 비밀번호를 입력하세요': 'newPassword',
  '비밀번호를 확인해주세요': 'confirmNewPassword',
  '비밀번호가 재설정 되었습니다.': '',
};

export type FindPasswordStep = (typeof steps)[number];
export const FindPasswordContext = createStepContext(steps);
