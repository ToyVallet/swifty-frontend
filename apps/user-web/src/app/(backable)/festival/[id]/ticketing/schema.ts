import { z } from 'zod';

/** 축제 고유 아이디 */
const scheduleId = z
  .string()
  .uuid({ message: '축제 아이디가 올바르지 않습니다.' });

/** 구역 */
//const area = z.string().min(1, { message: '구역을 선택해주세요.' });

export const ticketingSchema = z.object({
  scheduleId,
  //area,
});

export type TicketingValues = z.infer<typeof ticketingSchema>;
