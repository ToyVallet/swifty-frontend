import { createContext } from "react";

export const termsSteps = ['약관 동의가 필요해요'] as const;

export const identificationSteps = [
  '성함을 알려주세요',
  '생년월일을 알려주세요',
  '성별을 알려주세요',
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

export const StepContext = createContext<{
  currentStep: Step;
  nextStep: () => void;
}>({
  currentStep: steps[0],
  nextStep: () => {},
});