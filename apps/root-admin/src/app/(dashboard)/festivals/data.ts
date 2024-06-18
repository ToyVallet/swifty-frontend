import { API_FESTIVAL } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { FestivalInfoResponse } from '@type';

export async function getAllFestivals(id?: string) {
  return await customFetch<FestivalInfoResponse[]>(API_FESTIVAL.festival(id), {
    cache: 'no-cache',
    next: { tags: ['festivals'] },
    credentials: 'include',
  });
}
