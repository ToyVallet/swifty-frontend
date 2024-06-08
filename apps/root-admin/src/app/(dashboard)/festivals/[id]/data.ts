'use server';

import { customFetch } from "@/app/api";
import { getCookieValue } from "@/app/lib/cookies";
import { API_FESTIVAL } from "@/constant";

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
