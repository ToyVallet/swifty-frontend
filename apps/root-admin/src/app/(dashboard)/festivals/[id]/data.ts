'use server';

import { customFetch } from '@swifty/shared-lib';
import { getCookieValue } from "@lib/cookies";
import { API_FESTIVAL } from '@lib/constant/api';
import type { FestivalDetailResponse } from '@app/types/festival';

export async function getDetailFestival(id: string) {
  const access = await getCookieValue('swifty-access');
  const refresh = await getCookieValue('swifty-refresh');
  return await customFetch<FestivalDetailResponse>(API_FESTIVAL.detail(id), {
    method: 'GET',
    headers: {
      Cookie: `swifty-access=${access}; swifty-refresh=${refresh}`
    }
  });
}
