import { z } from 'zod';

/** 축제 고유 아이디 */
const scheduleId = z.string();

export const ticketingSchema = z.object({
  scheduleId,
});

export type TicketingValues = z.infer<typeof ticketingSchema>;
