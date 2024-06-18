'use server';

import { API_FESTIVAL } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { FestivalDetailResponse } from '@type';

export async function getDetailFestival(id: string) {
  return await customFetch<FestivalDetailResponse>(API_FESTIVAL.detail(id), {
    cache: 'no-cache',
    next: { tags: ['festival-detail'] },
    credentials: 'include',
  });
}
