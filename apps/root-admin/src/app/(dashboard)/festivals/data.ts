import type { FestivalInfoResponse } from '@app/types/festival';

import { API_FESTIVAL } from '@lib/constant/api';
import { customFetch } from '@swifty/shared-lib';
import insertCookieInRequest from '@app/lib/util/insert-cookie-in-request';

export async function getAllFestivals(id?: string) {
  const requestOption = await insertCookieInRequest({
    cache: 'no-cache',
    next: { tags: ['festivals'] }
  })
  return await customFetch<FestivalInfoResponse[]>(API_FESTIVAL.festival(id), requestOption);
}
