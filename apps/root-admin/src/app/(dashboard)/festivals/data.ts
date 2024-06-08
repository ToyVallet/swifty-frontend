'use server';

import { FestivalInfoResponse } from '@type/festival';

import { customFetch } from "@/app/api";
import { getCookieValue } from "@/app/lib/cookies";
import { API_FESTIVAL } from "@/constant";

export async function getAllFestivals(id?: string) {
  const access = await getCookieValue('swifty-access');
  const refresh = await getCookieValue('swifty-refresh');
  return await customFetch<FestivalInfoResponse[]>(API_FESTIVAL.festival(id), {
    method: 'GET',
    headers: {
      Cookie: `swiftyroot-access=${access}; swifty-refresh=${refresh}`
    }
  });
}
