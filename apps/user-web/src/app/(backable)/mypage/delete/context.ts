import createStepContext from '@contexts/step-context';

export const deleteUsersteps = [
  '비밀번호를 입력하세요',
  '안내사항을 확인해주세요',
  '회원탈퇴가 완료되었어요',
] as const;

export type DeleteUsersteps = (typeof deleteUsersteps)[number];

export const DeleteUserContext = createStepContext(deleteUsersteps);
