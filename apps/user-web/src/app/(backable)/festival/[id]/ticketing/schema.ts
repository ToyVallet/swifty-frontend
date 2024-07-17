import { z } from 'zod';

/** 축제 고유 아이디 */
const festivalId = z
  .string()
  .uuid({ message: '축제 아이디가 올바르지 않습니다.' });

/** 축제 날짜 */
const festivalDate = z.string().min(1, {
  message: '축제 날짜를 선택해주세요.',
});

/** 구역 */
const area = z.string().min(1, { message: '구역을 선택해주세요.' });

export const ticketingSchema = z.object({
  festivalId,
  festivalDate,
  area,
});

export type TicketingValues = z.infer<typeof ticketingSchema>;
