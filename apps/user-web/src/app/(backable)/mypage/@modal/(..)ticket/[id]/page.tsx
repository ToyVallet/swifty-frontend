import { TicketDetailDrawer } from '@components/ticket';
import type { TicketingResultApi } from '@lib/types';
import { type Params, http } from '@swifty/shared-lib';
import QRCode from 'qrcode';

export default async function TicketDeatilPage({
  params: { id },
}: Params<{ id: string }>) {
  const ticketDetail = await http.get<TicketingResultApi>('/ticket/{id}', {
    params: { id },
    query: { type: 'MY' },
    credentials: 'include',
  });
  const qrEmbeddedId = await QRCode.toDataURL(ticketDetail.qrEmbeddedId);
  return (
    <TicketDetailDrawer
      qrEmbeddedId={qrEmbeddedId}
      name={ticketDetail.name}
      issuedDateTime={ticketDetail.issuedDateTime}
      concertStartDateTime={ticketDetail.concertStartDateTime}
      concertEndDateTime={ticketDetail.concertEndDateTime}
      concertLocation={ticketDetail.concertLocation}
      areaName={ticketDetail.areaName}
      ticketIdentifier={ticketDetail.ticketIdentifier}
      ticketStatus={ticketDetail.ticketStatus}
      festivalName={ticketDetail.festivalName}
      concertName={ticketDetail.concertName}
      image={ticketDetail.image}
      backUrl="/mypage"
    />
  );
}
