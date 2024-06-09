import type { FestivalInfoResponse } from '@app/types/festival';

import { customFetch } from '@swifty/shared-lib';
import { getCookieValue } from "@lib/cookies";
import { API_FESTIVAL } from '@lib/constant/api';

export async function getAllFestivals(id?: string) {
  const access = await getCookieValue('swifty-access');
  const refresh = await getCookieValue('swifty-refresh');
  return await customFetch<FestivalInfoResponse[]>(API_FESTIVAL.festival(id), {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Cookie: `swifty-access=${access}; swifty-refresh=${refresh}`,
    }
  });
}
