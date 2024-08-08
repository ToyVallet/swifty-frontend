import TicketDrawer from '@components/ticket/ticket-drawer';
import type { UserTicketApi } from '@lib/types';
import { http } from '@swifty/shared-lib';

export default async function Page() {
  const availableTickets = await http.get<UserTicketApi[]>('/user/ticket');
  const overDateTickets = await http.get<UserTicketApi[]>('/user/ticket');

  return (
    <TicketDrawer
      availableTickets={availableTickets}
      overDateTickets={overDateTickets}
    />
  );
}
