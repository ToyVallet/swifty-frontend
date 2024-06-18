import { API_FESTIVAL, FETCH_TAG } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { FestivalInfoResponse } from '@type';

export async function getAllFestivals() {
  return await customFetch<FestivalInfoResponse[]>(API_FESTIVAL.festival(), {
    cache: 'no-cache',
    next: { tags: [FETCH_TAG.festivals] },
  });
}
