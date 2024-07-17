'use client';

import { createContext } from 'react';

export const phoneSteps = [
  '휴대폰 번호를 입력하세요',
  '인증번호를 입력하세요',
] as const;
export const passwordSteps = [
  '현재 비밀번호를 입력하세요',
  '새 비밀번호를 입력하세요',
  '비밀번호를 확인해주세요',
] as const;

export const steps = [
  ...phoneSteps,
  ...passwordSteps,
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
export const FindPasswordContext = createContext<{
  currentStep: FindPasswordStep;
  nextStep: () => void;
}>({
  currentStep: steps[0],
  nextStep: () => {},
});
