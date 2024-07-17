import createStepContext from '@contexts/step-context';

export const ticketingSteps = [
  '날짜를 선택해주세요',
  '구역을 선택해주세요',
  '선택 확인 페이지',
  '티켓 예매가 진행 중이에요\n조금만 기다려주세요',
] as const;

export type TicketingStep = (typeof ticketingSteps)[number];

export const TicketingStepContext = createStepContext(ticketingSteps);
