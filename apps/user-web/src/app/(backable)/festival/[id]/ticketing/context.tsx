import createStepContext from '@contexts/step-context';

export const ticketingSteps = [
  '날짜를 선택해주세요',
  //'구역을 선택해주세요',
  '티켓 예매 정보를 확인해주세요',
] as const;

export type TicketingStep = (typeof ticketingSteps)[number];

export const TicketingStepContext = createStepContext(ticketingSteps);
