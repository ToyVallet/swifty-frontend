import { TicketingWait } from '@components/ticketing';
import { type Params, getAllCookies } from '@swifty/shared-lib';

type TicketingResultPageProps = Params<{ id: string }>;

export default async function TicketWaitPage({
  params: { id },
}: TicketingResultPageProps) {
  // SSE를 활용한 연결 로직 추가 필요'
  const cookies = await getAllCookies();
  return <TicketingWait cookies={cookies} id={id} />;
}
