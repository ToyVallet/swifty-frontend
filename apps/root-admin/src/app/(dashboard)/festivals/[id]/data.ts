'use server';

import { customFetch } from '@swifty/shared-lib';
import { API_FESTIVAL } from '@lib/constant/api';
import type { FestivalDetailResponse } from '@app/types/festival';
import insertCookieInRequest from '@app/lib/util/insert-cookie-in-request';

export async function getDetailFestival(id: string) {
  const requestOption = await insertCookieInRequest({
    cache: 'no-cache',
    next: { tags: ['festival-detail'] }
  });
  return await customFetch<FestivalDetailResponse>(API_FESTIVAL.detail(id), requestOption);
}

