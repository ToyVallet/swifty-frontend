import type { FestivalInfoResponse } from '@type/festival';

import { API_FESTIVAL } from '@lib/constant/api';
import { customFetch } from '@swifty/shared-lib';

export async function getAllFestivals(id?: string) {
  return await customFetch<FestivalInfoResponse[]>(API_FESTIVAL.festival(id), {
    cache: 'no-cache',
    next: { tags: ['festivals'] },
    credentials: 'include'
  });
}
