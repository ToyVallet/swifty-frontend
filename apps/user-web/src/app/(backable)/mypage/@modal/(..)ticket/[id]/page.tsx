import { TicketDetailDrawer } from '@components/ticket';
import type { TicketingResultApi } from '@lib/types';
import { type Params, http } from '@swifty/shared-lib';

export default async function TicketDeatilPage({
  params: { id },
}: Params<{ id: string }>) {
  const ticketDetail = await http.get<TicketingResultApi>('/ticket/{id}', {
    params: { id },
    query: { type: 'MY' },
    credentials: 'include',
  });

  return <TicketDetailDrawer {...ticketDetail} />;
}
