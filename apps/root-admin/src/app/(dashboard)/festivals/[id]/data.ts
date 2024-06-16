'use server';

import { customFetch } from '@swifty/shared-lib';
import { API_FESTIVAL } from '@lib/constant/api';
import type { FestivalDetailResponse } from '@type/festival';

export async function getDetailFestival(id: string) {
  return await customFetch<FestivalDetailResponse>(API_FESTIVAL.detail(id), {
    cache: 'no-cache',
    next: { tags: ['festival-detail'] },
    credentials: 'include'
  });
}

